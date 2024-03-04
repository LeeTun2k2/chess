import datetime
from flask_login import login_user, logout_user
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from database.mongodb import get_db
from models.users import User

class AuthServices():
    def __init__(self) -> None:
        self.db = get_db()
        self.users_collection = self.db['users']

    def register(self, username: str, password: str, email: str, name: str):
        if self.users_collection.find_one({'username': username}):
            return False, 'Username already taken. Please choose another one.'

        # hash the password
        hashed_password = generate_password_hash(password)

        # insert user data
        user_data = {'username': username, 'password': hashed_password, 'email': email, 'name': name}
        result = self.users_collection.insert_one(user_data)

        return True, 'Registration successful!'

    def login(self, username: str, password: str):
        # find user
        user_data = self.users_collection.find_one({'username': username})

        # check password
        if not user_data or not check_password_hash(user_data['password'], password):
            return False, 'Invalid username or password. Please try again.'
        
        user = User()
        user.id = user_data['_id']
        login_user(user)

        access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(minutes=30))
        return True, access_token
        

    def logout(self):
        logout_user()