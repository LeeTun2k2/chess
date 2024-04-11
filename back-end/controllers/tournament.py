from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from services.tournament import TournamentService
from services.user import UserService

tournament_bp = Blueprint('tournament', __name__)

tournament_service = TournamentService()
user_service = UserService()

@tournament_bp.route('/api/tournaments', methods=['GET'])
def get_all_tournaments():
    try:
        tournaments = tournament_service.get_all()
        return jsonify({
            "message": "success",
            "tournaments": tournaments
        }), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@tournament_bp.route('/api/tournaments/<tournament_id>', methods=['GET'])
def get_tournament_by_id(tournament_id):
    try:
        tournament = tournament_service.get(tournament_id)
        if tournament:
            return jsonify({
                "message": "success",
                "tournament": tournament
            }), 200
        else:
            return jsonify({'message': 'tournament not found'}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@tournament_bp.route('/api/tournaments', methods=['POST'])
@jwt_required()
def create_tournament():
    try:
        data = {
            "name": request.json.get('name'),
            "description": request.json.get('description'),
            "variant": request.json.get('variant'),
            "initial_time": request.json.get('initial_time'),
            "bonus_time": request.json.get('bonus_time'),
            "start": request.json.get('start'),
            "end": request.json.get('end'),
        }
        
        new_tournament = tournament_service.create(data)
        return jsonify({
            "message": "success",
            "tournament": new_tournament
        }), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@tournament_bp.route('/api/tournaments/<tournament_id>', methods=['PUT'])
@jwt_required()
def update_tournament(tournament_id):
    try:
        data = {
            "name": request.json.get('name'),
            "description": request.json.get('description'),
            "variant": request.json.get('variant'),
            "initial_time": request.json.get('initial_time'),
            "bonus_time": request.json.get('bonus_time'),
            "start": request.json.get('start'),
            "end": request.json.get('end'),
        }
        updated = tournament_service.update(tournament_id, data)
        if updated:
            return jsonify({
                "message": "success",
            }), 200
        else:
            return jsonify({'message': 'tournament not found'}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@tournament_bp.route('/api/tournaments/<tournament_id>', methods=['DELETE'])
@jwt_required()
def delete_tournament(tournament_id):
    try:
        success = tournament_service.delete(tournament_id)
        if success:
            return jsonify({'message': 'tournament deleted successfully'}), 200
        else:
            return jsonify({'message': 'tournament not found'}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500
