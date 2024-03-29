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
    
    def get_by_username(self, username: str):
        user_data = self.users_collection.find_one({'username': username})
        if not user_data:
            return None
        user = self.map_user(user_data)
        return user
    
    def get_by_email(self, email: str):
        user_data = self.users_collection.find_one({'email': email})
        if not user_data:
            return None
        user = self.map_user(user_data)
        return user
    
    def update_current_user(self, user_id, username = None, email = None, name = None):
        updated = {}
        if username != None: 
            updated['username'] = username
        if email != None: 
            updated['email'] = email
        if name != None: 
            updated['name'] = name
        
        result = self.users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': updated}
        )

        if result.modified_count == 0:
            return False, "Failed to update profile."
        return True, "Profile updated successfully."
