from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from secrets import token_hex
from services.user import UserService
from datetime import timedelta
from flask_socketio import SocketIO

from controllers.index import index_bp
from controllers.auth import auth_bp
from controllers.test import test_bp
from controllers.user import user_bp
from controllers.game import game_bp
from controllers.lobby import lobby_bp

app = Flask(__name__)

# enable cors
CORS(app)
CORS(index_bp)
CORS(auth_bp)
CORS(test_bp)
CORS(user_bp)
CORS(game_bp)
CORS(lobby_bp)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'a' # token_hex()
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

# Register email service
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'letung109922@gmail.com'
app.config['MAIL_PASSWORD'] = 'lspjxfdsmfugwgfl'
app.config['MAIL_DEFAULT_SENDER'] = ("UTE CHESS CLUB", "clbcospkt@gmail.com")
mail = Mail(app)

# Register authentication service
login_manager = LoginManager(app)
jwt = JWTManager(app)
@login_manager.user_loader
def load_user(user_id):
    return UserService().get_by_id(user_id)

# Register API service
app.register_blueprint(test_bp)
app.register_blueprint(index_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(game_bp)
app.register_blueprint(lobby_bp)

socketio = SocketIO(app, cors_allowed_origins="*")

if __name__ == '__main__':
    socketio.run(app,host='0.0.0.0', port=5000, debug=True)

