from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register')
def register():
    return "Register", 200

@auth_bp.route('/api/login')
def login():
    return "Login", 200

@auth_bp.route('/api/logout')
def logout():
    return "Logout", 200

@auth_bp.route('/api/forgot')
def forgot():
    return "Forgot", 200
