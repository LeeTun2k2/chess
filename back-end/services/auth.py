from datetime import timedelta
import secrets
import string
from flask_login import login_user, logout_user
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from database.mongodb import get_db
from models.users import User
from services.email import EmailService

class AuthServices():
    def __init__(self) -> None:
        self.db = get_db()
        self.users_collection = self.db['users']
        self.proxy = 'http://localhost:5000/api'
        self.email_service = EmailService()

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

        user_id = str(user.id)
        access_token = create_access_token(identity=user_id, expires_delta=timedelta(minutes=30))
        return True, access_token

    def logout(self):
        logout_user()

    def forgot_password(self, email:str):
        if not self.users_collection.find_one({'email': email}):
            return False, 'Invalid user.'

        # generate token
        token = "token"

        # send email
        reset_url = f'{self.proxy}/reset-password?email={email}&token={token}'
        self.email_service.send_reset_password_email(email, reset_url)
        return True, 'Reset password action has sent to your email.'

    def generate_random_password(self, length=8):
        characters = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(characters) for _ in range(length))
        return password

    def reset_password(self, email, token):
        # verify token
        if token != 'token':
            return False, 'Invalid token.'

        # generate new password
        new_password = self.generate_random_password()
        new_password_hashed = generate_password_hash(new_password)

        # update password
        result = self.users_collection.update_one(
            {'email': email},
            {'$set': {'password': new_password_hashed}}
        )

        if result.modified_count == 0:
            return False, 'User not found or password not updated.'
        
        # send email
        self.email_service.send_new_password_email(email=email, password=new_password)

        return True, 'Reset password successfully.'