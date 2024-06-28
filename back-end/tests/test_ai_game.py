import pytest
import json
from flask_jwt_extended import create_access_token

def test_new_ai_game(test_client):
    access_token = create_access_token(identity='test_user_id')
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    response = test_client.post('/api/ai-game', headers=headers, json={'game_data': 'test'})
    assert response.status_code == 201
    data = json.loads(response.data)
    assert 'id' in data

def test_get_ai_game(test_client):
    access_token = create_access_token(identity='test_user_id')
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    response = test_client.get('/api/ai-game/test_game_id', headers=headers)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'id' in data

def test_draw_ai_game(test_client):
    access_token = create_access_token(identity='test_user_id')
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    response = test_client.put('/api/ai-game/test_game_id/draw', headers=headers)
    assert response.status_code == 200

def test_resign_ai_game(test_client):
    access_token = create_access_token(identity='test_user_id')
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    response = test_client.put('/api/ai-game/test_game_id/resign', headers=headers)
    assert response.status_code == 200

def test_checkmate_ai_game(test_client):
    access_token = create_access_token(identity='test_user_id')
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    response = test_client.put('/api/ai-game/test_game_id/checkmate', headers=headers, json={'player_win_id': 'winner_id'})
    assert response.status_code == 200

def test_request_ai_move(test_client):
    access_token = create_access_token(identity='test_user_id')
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    response = test_client.post('/api/ai-game/test_game_id/request_ai_move', headers=headers, json={'fen': 'some_fen'})
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'move' in data
