from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.tournament import TournamentService
from services.user import UserService
from services.game import GameService

tournament_bp = Blueprint('tournament', __name__)

tournament_service = TournamentService()
game_service = GameService()
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
    
@tournament_bp.route('/api/tournaments/<tournament_id>/your-games', methods=['GET'])
@jwt_required()
def get_game_in_tournament(tournament_id):
    try:
        user_id = get_jwt_identity()
        user = user_service.get_by_id(user_id)
        if not user:
            return jsonify({"message": "User not found."}), 400

        # get all game in tournaments
        games = game_service.get_by_tournament_id(tournament_id)

        # filter game has user_id
        res = []
        for game in games:
            if game["white"] == user_id or game["black"] == user_id:
                res.append(game)

        return jsonify({
            "message": "success",
            "games": res
        }), 200
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
