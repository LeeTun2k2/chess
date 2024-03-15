from flask import Blueprint, jsonify
from database.mongodb import get_mongo
from flask_login import login_required
from logging import error
from services.user import UserService

test_bp = Blueprint('test', __name__)

@test_bp.get('/api/test/connection')
def test_connection():
    try:
        client = get_mongo()
        return "You successfully connected to MongoDB!", 200
    except Exception as e:
        error(e)
        return "Fail to connected to MongoDB!", 500
    
@test_bp.route('/api/test/user/all')
def get_all_user():
    service = UserService()
    data = service.get_all()
    return jsonify(data), 200
