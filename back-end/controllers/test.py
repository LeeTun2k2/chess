from flask import Blueprint
from database.mongodb import get_mongo

test_bp = Blueprint('test', __name__)

@test_bp.get('/api/test/connection')
def test_connection():
    try:
        client = get_mongo()
        return "You successfully connected to MongoDB!", 200
    except Exception as e:
        return e, 500