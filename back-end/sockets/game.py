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
    
    # status == close => create game
    game = game_service.create_online_game(lobby, user)
    emit('game_ready', {'game': game, 'lobby_id': lobby_id}, broadcast=True, namespace='/')

def join_game(game_id: str): 
    emit('game_start', {'message': 'Game start', 'game_id': game_id}, broadcast=True, namespace='/')

def send_move(game_id: str, move): 
    emit('receive_move', {'move': move, 'game_id': game_id}, broadcast=True, namespace='/')