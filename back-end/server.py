from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from secrets import token_hex
from services.user import UserService
from datetime import timedelta

from controllers.index import index_bp
from controllers.auth import auth_bp
from controllers.test import test_bp
from controllers.user import user_bp

app = Flask(__name__)
cors = CORS(app)
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)