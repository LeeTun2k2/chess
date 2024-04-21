from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from services.image import ImageService
from services.other import OtherService

other_bp = Blueprint('other', __name__)

images_service = ImageService()
others_service = OtherService()

@other_bp.route('/api/donate', methods=['PUT'])
@jwt_required()
def update_book():
    try:
        image = request.files.get('image')
        updated = images_service.save_file(image, "donate", image.filename.split(".")[-1])
        if updated:
            return jsonify({
                "message": "success",
            }), 200
        else:
            return jsonify({'message': 'Book not found'}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    

@other_bp.route('/api/offline-calendar', methods=['GET'])
def get_offline_calendar():
    try:
        offline_calendar = others_service.get_offline_calendar()
        return jsonify({
            "message": "success",
            "offline_calendar": offline_calendar
        }), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@other_bp.route('/api/offline-calendar', methods=['PUT'])
@jwt_required()
def set_offline_calendar():
    try:
        data = request.get_json()
        
        updated = others_service.set_offline_calendar(data["time"], data["location"])
        if updated:
            return jsonify({
                "message": "success",
            }), 200
        else:
            return jsonify({'message': 'Fail to set value'}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500