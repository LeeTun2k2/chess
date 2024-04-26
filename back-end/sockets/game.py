from services.lobby import LobbyService
from services.game import GameService
from services.user import UserService
from flask_socketio import emit

lobby_service = LobbyService()
game_service = GameService()
user_service = UserService()

def request_game(user_id, lobby_id):
    lobby = lobby_service.get_lobby(lobby_id) 
    if lobby['status'] == 'OPEN':
        emit('error', {'message': 'Lobby is open'}, namespace='/')
        return
    
    user = user_service.get_by_id(user_id)
    if not user:
        emit('error', {'message': 'User not found'}, namespace='/')
        return
    
    # get lobby
    game = game_service.get_by_lobby_id(lobby_id=lobby_id)

    if not game:
        # status == close => create game
        game = game_service.create_online_game(lobby, user)
    emit('game_ready', {'game': game, 'lobby_id': lobby_id}, broadcast=True, namespace='/')

def join_game(game_id: str): 
    emit('game_start', {'game_id': game_id}, broadcast=True, namespace='/')

def send_move(game_id: str, fen: str, move: str, whiteTime: int, blackTime: int):
    emit(
        'receive_move', 
        {
            'move': move, 
            'fen': fen,
            'game_id': game_id,
            'whiteTime': whiteTime,
            'blackTime': blackTime
        }, 
        broadcast=True, 
        namespace='/')

def offer_draw(game_id: str, player_offer_id: str):
    emit("offer_draw", {'game_id': game_id, "player_offer_id": player_offer_id}, broadcast=True, namespace='/')

def accept_draw(game_id: str, player_accept_id: str):
    emit("accept_draw", {'game_id': game_id, "player_accept_id": player_accept_id}, broadcast=True, namespace='/')

def reject_draw(game_id: str, player_reject_id: str):
    emit("reject_draw", {'game_id': game_id, "player_reject_id": player_reject_id}, broadcast=True, namespace='/')

def resign(game_id: str, player_resign_id: str):
    emit("resign", {'game_id': game_id, "player_resign_id": player_resign_id}, broadcast=True, namespace='/')

def timeout(game_id: str, player_timeout_id: str):
    emit("timeout", {'game_id': game_id, "player_timeout_id": player_timeout_id}, broadcast=True, namespace='/')