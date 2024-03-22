from flask import Blueprint, jsonify, request
from logging import error
from flask_login import login_required
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.auth import AuthServices
from services.user import UserService
from services.validate.user import validate, validate_short, validate_email

auth_bp = Blueprint('auth', __name__)

@auth_bp.post('/api/register')
def register():
    try:
        # get data from request
        data = request.get_json()
        username: str = data.get('username')
        password: str = data.get('password')
        email: str = data.get('email')
        name: str = data.get('name')

        # validate
        ok, message = validate(username, password, email, name)
        if not ok:
            return message, 400

        # register
        authService = AuthServices()
        ok, message = authService.register(username, password, email, name)
        if not ok: 
            return message, 409
        return message, 201
    except Exception as e:
        error(e)
        return 'Fail to register.', 500
    
@auth_bp.post('/api/send-verification')
def send_verification():
    try:
        # get data from request
        data = request.get_json()
        email: str = data.get('email')

        # validate
        ok, message = validate(email=email)
        if not ok:
            return message, 400

        # register
        authService = AuthServices()
        ok, message = authService.send_verification(email)
        if not ok: 
            return message, 409
        return message, 201
    except Exception as e:
        error(e)
        return 'Fail to send verification.', 500
    
@auth_bp.post('/api/verify-email')
def verify_email():
    try:
        # get data from request
        data = request.get_json()
        email: str = data.get('email')
        token: str = data.get('token')

        # validate
        ok, message = validate(email=email)
        if not ok:
            return message, 400

        # register
        authService = AuthServices()
        ok, message = authService.verify(email=email, token=token)
        if not ok: 
            return message, 409
        return message, 201
    except Exception as e:
        error(e)
        return 'Fail to verify email.', 500

@auth_bp.post('/api/login')
def login():
    try:
        # get data from request
        data = request.get_json()
        username: str = data.get('username')
        password: str = data.get('password')

        # validate
        ok, message = validate_short(username, password)
        if not ok:
            return message, 400

        # login
        authService = AuthServices()
        ok, token = authService.login(username, password)
        if not ok: 
            return token, 401
        access_token, refresh_token = token
        user = UserService().get_by_username(username).to_json()
        return jsonify({'access_token': access_token, 'refresh_token': refresh_token, 'user': user}), 200
    except Exception as e:
        error(e)
        return 'Fail to log in.', 500
    
@auth_bp.post('/api/refresh')
@jwt_required(refresh=True)
def refresh():
    current_username = get_jwt_identity()
    access_token = AuthServices().refresh_token(username=current_username)
    return jsonify({'access_token':access_token}), 200

@auth_bp.get('/api/logout')
@login_required
@jwt_required()
def logout():
    try:
        authService = AuthServices()
        authService.logout()
        return 'Log out successful.', 200
    except Exception as e:
        error(e)
        return 'Fail to log out.', 500
    
@auth_bp.get('/api/protected')
@login_required
@jwt_required()
def protected():
    current_username = get_jwt_identity()
    return jsonify(logged_in_as=current_username), 200

@auth_bp.get('/api/forgot-password')
def forgot_password():
    try:
        email = request.args.get('email')
        ok, msg = validate_email(email)
        if not ok: 
            return msg, 400

        authService = AuthServices()
        ok, msg = authService.forgot_password(email)
        if not ok: 
            return msg, 404
        return msg, 200
    except Exception as e:
        error(e)
        return 'Fail to forgot password.', 500

@auth_bp.get('/api/reset-password')
def reset_password():
    try:
        email = request.args.get('email')
        token = request.args.get('token')

        ok, msg = validate_email(email)
        if not ok: 
            return msg, 400

        authService = AuthServices()
        ok, msg = authService.reset_password(email, token)
        if not ok: 
            return msg, 404
        return msg, 200
    except Exception as e:
        error(e)
        return 'Fail to reset password.', 500