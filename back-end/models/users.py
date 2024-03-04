from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, user_id = None, username = None, email = None, name = None):
        self.id = user_id
        self.username = username
        self.email = email
        self.name = name