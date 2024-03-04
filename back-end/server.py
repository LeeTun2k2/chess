from flask import Flask
from flask_cors import CORS

from controllers.index import index_bp
from controllers.auth import auth_bp
from controllers.test import test_bp

from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from secrets import token_hex
from services.user import UserService

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = "a" #token_hex() # Random

# Register authentication service
login_manager = LoginManager(app)
jwt = JWTManager(app)

@login_manager.user_loader
def load_user(user_id):
    userService = UserService()
    user = userService.get_by_id(user_id)
    return user

# Register API service
app.register_blueprint(test_bp)
app.register_blueprint(index_bp)
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)