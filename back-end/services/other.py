from bson import ObjectId
from database.mongodb import get_db
from datetime import datetime

class OtherService():
    def __init__(self) -> None:
        self.db = get_db()
        self.others_collection = self.db['others']
        self.payment_history_collection = self.db['payment_history']
    
    def get_offline_calendar(self):
        data = self.others_collection.find().sort("updated_at", -1)
        data = [item for item in data]
        if not data:
            return {}
        record = data[0]
        record["_id"] = str(record["_id"])
        return record
    
    def set_offline_calendar(self, time, location):
        data = self.others_collection.find().sort("updated_at", -1)
        data = [item for item in data]
        offline_calendar_data = {
            'time': time,
            'location': location,
            'updated_at': datetime.now().isoformat()
        }

        if not data:
            self.others_collection.insert_one(offline_calendar_data)
            return True

        record = data[0]
        result = self.others_collection.update_one({'_id': record["_id"]}, {'$set': offline_calendar_data})
        return result.modified_count > 0
    
    def log_payment(self, type, status, orderId, response):
        payment_data = {
            'type': type,
            'orderId': orderId,
            'status': status,
            'timestamp': datetime.now().isoformat(),
            'response': response
        }
        self.payment_history_collection.insert_one(payment_data)
        return True
    
    def get_all_payments(self):
        payments = self.payment_history_collection.find().sort("timestamp", -1)
        return [self._convert_id(payment) for payment in payments]
    
    def _convert_id(self, payment):
        payment['_id'] = str(payment['_id'])
        return payment