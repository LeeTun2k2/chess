from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, user_id = None, username = None, email = None, name = None):
        self.id = str(user_id)
        self.username = username
        self.email = email
        self.name = name

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name
        }