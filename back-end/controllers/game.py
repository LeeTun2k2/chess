from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from logging import error
from services.game import GameService
from services.user import UserService

game_bp = Blueprint('game', __name__)

game_service = GameService()
user_service = UserService()

@game_bp.post('/api/game')
@jwt_required()
def newGame():
    try:
        game = request.get_json()
        mode = game['mode']
        newGame = game_service.create_game(game, mode)
        return jsonify(newGame), 201
    except Exception as e:
        error(e)
        return "Fail to update game profile.", 500
    
@game_bp.get('/api/game/<game_id>&mode=<mode>')
@jwt_required()
def getGame(game_id: str, mode: str):
    game = game_service.get_game(game_id, mode)
    game['white_player'] = user_service.get_by_id(game['white']).to_json()
    game['black_player'] = user_service.get_by_id(game['black']).to_json()
    return jsonify(game), 200

@game_bp.put('/api/game')
@jwt_required()
def updateGame(game_id, mode):
    try:
        game = request.get_json()
        game_service.update_game(game_id, game, mode)
        return "Game updated successfully.", 200
    except Exception as e:
        error(e)
        return "Fail to update game profile.", 500
    
@game_bp.delete('/api/game')
@jwt_required()
def deleteGame(game_id, mode):
    try:
        game_service.delete_game(game_id, mode)
        return "Game deleted successfully.", 200
    except Exception as e:
        error(e)
        return "Fail to delete game profile.", 500