from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_jwt_extended import jwt_required, get_jwt_identity
from logging import error
from services.user import UserService
from services.validate.user import validate

user_bp = Blueprint('user', __name__)

@user_bp.put('/api/update-profile')
@jwt_required()
@login_required
def update_profile():
    try:
        user_id = get_jwt_identity()
        current_user_id = str(current_user.get_id())

        # ensure that the JWT identity matches the current user
        if user_id != current_user_id:
            return "Invalid user", 401

        # get data
        data = request.get_json()
        email = data.get('email')
        name = data.get('name')

        # validate
        ok, msg = validate(email=email, name=name)
        if not ok:
            return msg, 400

        # update user profile
        service = UserService()
        ok, msg = service.update_current_user(user_id, email=email, name=name)
        if not ok:
            return msg, 400
        return msg, 200
    except Exception as e:
        error(e)
        return "Fail to update user profile.", 500
    

@user_bp.get('/api/profile')
@jwt_required()
@login_required
def profile():
    try:
        user_id = get_jwt_identity()
        current_user_id = str(current_user.get_id())

        # ensure that the JWT identity matches the current user
        if user_id != current_user_id:
            return "Invalid user", 401

        # get user profile
        service = UserService()
        user = service.get_by_id(user_id)
        if not user:
            return 'User not found.', 404
        
        data = {
            'username': user.username,
            'email': user.email,
            'name': user.name
        }
        return jsonify(data), 200
    except Exception as e:
        error(e)
        return "Fail to get user profile.", 500