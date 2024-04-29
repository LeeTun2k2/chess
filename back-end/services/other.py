from bson import ObjectId
from database.mongodb import get_db
from datetime import datetime

class OtherService():
    def __init__(self) -> None:
        self.db = get_db()
        self.others_collection = self.db['others']
    
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