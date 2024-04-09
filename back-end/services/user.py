from bson import ObjectId
from database.mongodb import get_db
from models.users import User

class UserService():
    def __init__(self) -> None:
        self.db = get_db()
        self.users_collection = self.db['users']

    def map_user(self, user_data):
        user = User(
            user_id=user_data['_id'], 
            username=user_data['username'], 
            email=user_data['email'], 
            name=user_data['name'], 
            is_verified=user_data["is_verified"], 
            is_locked=user_data["is_locked"], 
            role=user_data["role"])
        return user

    def get_all(self):
        users = list(self.users_collection.find())
        return [self.map_user(user).to_json() for user in users]

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


    def get_all_admin(self):
        admins = list(self.users_collection.find({'role': 'ADMIN'}))
        return [self.map_user(admin).to_json() for admin in admins]
    
    def set_role(self, user_id, role):
        if role == 'ADMIN' or role == 'PLAYER':
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': {'role': role}}
            )

            if result.modified_count == 0:
                return False, "Failed to update."
            return True, "Updated successfully."
        return False, "Invalid role."
    
    def toggle_status(self, user_id):
        user = self.users_collection.find_one({'_id': ObjectId(user_id)})
        if user:
            new_status = not user.get('status', False)  # Toggle the status
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': {'status': new_status}}
            )
            if result.modified_count > 0:
                return True, f"Status toggled to {'active' if new_status else 'inactive'} successfully."
            else:
                return False, "Failed to toggle status."
        else:
            return False, "User not found."
