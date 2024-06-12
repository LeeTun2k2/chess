from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_jwt_extended import jwt_required, get_jwt_identity
from logging import error
from services.user import UserService
from services.validate.user import validate
from datetime import datetime, timedelta, timezone
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
    
@user_bp.get('/api/user/<username>')
@jwt_required()
def user_profile(username: str):
    try:
        service = UserService()
        user = service.get_by_username(username)
        if not user:
            return 'User not found.', 404
        
        return jsonify(user.to_json()), 200
    except Exception as e:
        error(e)
        return "Fail to get user profile.", 500
    
@user_bp.route('/api/users', methods=['GET'])
@jwt_required()
def get_all_users():
    try:
        service = UserService()
        users = service.get_all()
        return jsonify({"message": "success", "users": users}), 200
    except Exception as e:
        error(e)
        return "Fail to get user profile.", 500

@user_bp.route('/api/users/admins', methods=['GET'])
@jwt_required()
def get_all_admins():
    try:
        service = UserService()
        admins = service.get_all_admin()
        return jsonify({"message": "success", "users": admins}), 200
    except Exception as e:
        error(e)
        return "Fail to get user profile.", 500

@user_bp.route('/api/users/<user_id>/role', methods=['PUT'])
@jwt_required()
def set_role(user_id):
    try:
        role_data = request.get_json()
        if 'role' not in role_data:
            return jsonify({'error': 'Role is required'}), 400
        
        service = UserService()
        success, message = service.set_role(user_id, role_data['role'])
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 400
    except Exception as e:
        error(e)
        return "Fail to get user profile.", 500
    
@user_bp.route('/api/users/<user_id>/status', methods=['PUT'])
@jwt_required()
def toggle_status(user_id):
    try:
        service = UserService()
        success, message = service.toggle_status(user_id)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 400
    except Exception as e:
        error(e)
        return "Fail to get user profile.", 500
    


@user_bp.post('/api/users/send-friend-request/<friend_id>')
@jwt_required()
def send_friend_request(friend_id):
    try:
        current_user_id = get_jwt_identity()

        service = UserService()
        friend = service.get_by_id(friend_id)
        if not friend:
            return jsonify({'error': 'Friend not found'}), 404

        success, message = service.send_friend_request(current_user_id, friend_id)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 400
    except Exception as e:
        error(e)
        return "Failed to send friend request.", 500

@user_bp.get('/api/users/friend-requests')
@jwt_required()
def get_friend_requests():
    try:
        current_user_id = get_jwt_identity()
        print(current_user_id)
        service = UserService()
        friend_requests = service.get_friend_requests(current_user_id)
        return jsonify({"message": "success", "friend_requests": friend_requests}), 200
    except Exception as e:
        error(e)
        return "Failed to get friend requests.", 500

@user_bp.post('/api/users/accept-friend-request/<friend_id>')
@jwt_required()
def accept_friend_request(friend_id):
    try:
        current_user_id = get_jwt_identity()

        service = UserService()
        success, message = service.accept_friend_request(current_user_id, friend_id)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 400
    except Exception as e:
        error(e)
        return "Failed to accept friend request.", 500

@user_bp.delete('/api/users/decline-friend-request/<friend_id>')
@jwt_required()
def decline_friend_request(friend_id):
    try:
        current_user_id = get_jwt_identity()

        service = UserService()
        success, message = service.decline_friend_request(current_user_id, friend_id)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 400
    except Exception as e:
        error(e)
        return "Failed to decline friend request.", 500

@user_bp.route('/api/users/friends', methods=['GET'])
@jwt_required()
def get_friends():
    try:
        user_id = get_jwt_identity()
        service = UserService()
        friends = service.get_friends(user_id)
        return jsonify({"message": "success", "friends": friends}), 200
    except Exception as e:
        error(e)
        return "Fail to get friends list.", 500
    
@user_bp.route('/api/users/search', methods=['GET'])
@jwt_required()
def find_users():
    try:
        user_id = get_jwt_identity()
        query = request.args.get('q')
        if not query:
            return jsonify({'error': 'Search query is required'}), 400
        
        service = UserService()
        users = service.find_users(user_id, query)
        return jsonify({"message": "success", "users": users}), 200
    except Exception as e:
        error(e)
        return "Fail to search users.", 500
    
@user_bp.delete('/api/users/unfriend/<friend_id>')
@jwt_required()
def unfriend(friend_id):
    try:
        current_user_id = get_jwt_identity()

        service = UserService()
        success, message = service.unfriend(current_user_id, friend_id)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 400
    except Exception as e:
        error(e)
        return "Failed to unfriend.", 500



@user_bp.post('/api/users/become-vip')
@jwt_required()
def become_vip():
    try:
        user_id = get_jwt_identity()
        # get VIP duration from request
        data = request.get_json()
        vip_duration_days = data.get('vip_duration_days', 30)  # default to 30 days if not provided
        orderId = data.get('order_id')

        vip_expiry = datetime.utcnow() + timedelta(days=vip_duration_days)

        service = UserService()
        success, message = service.set_vip_status(user_id, True, vip_expiry)
        if success:
            return jsonify({'message': message, 'vip_expiry': vip_expiry.isoformat()}), 200
        else:
            return jsonify({'error': message}), 400
    except Exception as e:
        error(e)
        return "Failed to become VIP.", 500

@user_bp.get('/api/users/vip-status')
@jwt_required()
def vip_status():
    try:
        user_id = get_jwt_identity()
        service = UserService()
        vip_status, vip_expiry = service.get_vip_status(user_id)
        if vip_expiry:
            vip_expiry = vip_expiry.isoformat()

        return jsonify({'is_vip': vip_status, 'vip_expiry': vip_expiry}), 200
    except Exception as e:
        error(e)
        return "Failed to get VIP status.", 500
