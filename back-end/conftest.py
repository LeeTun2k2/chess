import pytest
from server import app
from database.mongodb import get_mongo

@pytest.fixture(scope='module')
def test_client():
    flask_app = app

    flask_app.config['TESTING'] = True
    flask_app.config['MONGO_URI'] = 'mongodb://localhost:27017/test_db'
    flask_app.config['SECRET_KEY'] = 'test_secret_key'

    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            mongo = get_mongo()
            mongo.db.drop_collection('achievements')
            yield testing_client
            mongo.db.drop_collection('achievements')
