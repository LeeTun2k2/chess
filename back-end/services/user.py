from bson import ObjectId
from database.mongodb import get_db
from models.users import User

class UserService():
    def __init__(self) -> None:
        self.db = get_db()
        self.users_collection = self.db['users']

    def map_user(self, user_data):
        user = User(user_data['_id'], user_data['username'], user_data['email'], user_data['name'])
        return user

    def get_all(self):
        users = list(self.users_collection.find())
        return users

    def get_by_id(self, user_id: str):
        user_data = self.users_collection.find_one({'_id': ObjectId(user_id)})
        
        if not user_data:
            return None
        
        user = self.map_user(user_data)
        
        return user