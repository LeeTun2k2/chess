from bson import ObjectId
from database.mongodb import get_db
from datetime import datetime

class AchievementService():
    def __init__(self) -> None:
        self.db = get_db()
        self.achievements_collection = self.db['achievements']

    def map(self, achievement):
        achievement['_id'] = str(achievement['_id'])
        if achievement['created_at']:
            achievement['created_at'] = achievement['created_at'].isoformat()
        if achievement['updated_at']:
            achievement['updated_at'] = achievement['updated_at'].isoformat()
        return achievement

    def get_all(self):
        data = self.achievements_collection.find({}).sort('updated_at', -1)
        data = [self.map(achievement) for achievement in data]
        return data
    
    def get(self, _id):
        return self.map(self.achievements_collection.find_one({'_id': ObjectId(_id)}))

    def create(self, achievement):
        if '_id' in achievement:
            raise ValueError("Cannot create a achievement with an existing _id")

        achievement["created_at"] = datetime.now()
        achievement["updated_at"] = datetime.now()
        result = self.achievements_collection.insert_one(achievement)
        return self.map(self.achievements_collection.find_one({'_id': result.inserted_id}))
    
    def update(self, _id, achievement):
        existing_achievement = self.achievements_collection.find_one({'_id': ObjectId(_id)})
        if not existing_achievement:
            return None  

        if '_id' in achievement:
            del achievement['_id'] 

        achievement["updated_at"] = datetime.now()

        result = self.achievements_collection.update_one({'_id': ObjectId(_id)}, {'$set': achievement})
        if result.modified_count == 0:
            return False
        return True

    def delete(self, achievement_id):
        result = self.achievements_collection.delete_one({'_id': ObjectId(achievement_id)})
        return result.deleted_count > 0