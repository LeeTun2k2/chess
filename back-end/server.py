from flask import Flask
from flask_cors import CORS

from controllers.index import index_bp
from controllers.auth import auth_bp

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(index_bp)
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)