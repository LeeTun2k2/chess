from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.blog import BlogService

blog_bp = Blueprint('blog', __name__)
blog_service = BlogService()

@blog_bp.post('/api/blog')
@jwt_required()
def create_blog():
    user_id = get_jwt_identity()
    try:
        blog_data = request.get_json()
        new_blog = blog_service.create_blog(blog_data, user_id)
        return jsonify(new_blog), 201
    except Exception as e:
        return str(e), 500

@blog_bp.post('/api/blog/<blog_id>/comment')
@jwt_required()
def add_comment(blog_id):
    user_id = get_jwt_identity()
    try:
        comment_data = request.get_json()
        blog = blog_service.add_comment(blog_id, comment_data, user_id)
        return jsonify(blog), 200
    except Exception as e:
        return str(e), 500

@blog_bp.put('/api/blog/<blog_id>/like')
@jwt_required()
def like_blog(blog_id):
    user_id = get_jwt_identity()
    try:
        blog = blog_service.like_blog(blog_id, user_id)
        return jsonify(blog), 200
    except Exception as e:
        return str(e), 500

@blog_bp.get('/api/blog')
def get_blogs():
    try:
        blogs = blog_service.get_blogs()  # Thay thế hàm này bằng phương thức thích hợp từ dịch vụ BlogService của bạn
        return jsonify(blogs), 200
    except Exception as e:
        return str(e), 500
    
