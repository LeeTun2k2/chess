import pytest
from unittest.mock import patch, MagicMock
from flask_jwt_extended import create_access_token


def get_auth_headers(user_id):
    access_token = create_access_token(identity=user_id)
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    return headers

def test_new_game(test_client):
    user_id = 'test_user_id'
    headers = get_auth_headers(user_id)
    with patch('services.game.GameService.create_game') as mock_create_game:
        mock_create_game.return_value = {"id": "test_game_id"}

        response = test_client.post('/api/game', headers=headers, json={
            'mode': 'test_mode'
        })
        assert response.status_code == 201
        assert 'id' in response.json

def test_get_game(test_client):
    game_id = 'test_game_id'
    mode = 'test_mode'
    user_data = MagicMock()
    user_data.to_json.return_value = {"id": "user_id"}

    with patch('services.game.GameService.get_game') as mock_get_game, \
         patch('services.user.UserService.get_by_id', return_value=user_data):
        mock_get_game.return_value = {
            'id': game_id, 
            'mode': mode, 
            'white': 'white_player_id', 
            'black': 'black_player_id'
        }

        response = test_client.get(f'/api/game/{game_id}&mode={mode}')
        assert response.status_code == 200
        assert 'white_player' in response.json
        assert 'black_player' in response.json

def test_update_game(test_client):
    game_id = 'test_game_id'
    user_id = 'test_user_id'
    headers = get_auth_headers(user_id)

    with patch('services.game.GameService.update_game') as mock_update_game:
        mock_update_game.return_value = True

        response = test_client.put(f'/api/game/{game_id}', headers=headers, json={
            'mode': 'updated_mode'
        })
        assert response.status_code == 200
        assert response.data.decode() == "Game updated successfully."

def test_delete_game(test_client):
    game_id = 'test_game_id'
    mode = 'test_mode'
    user_id = 'test_user_id'
    headers = get_auth_headers(user_id)

    with patch('services.game.GameService.delete_game') as mock_delete_game:
        mock_delete_game.return_value = True

        response = test_client.delete(f'/api/game', headers=headers, query_string={
            'game_id': game_id,
            'mode': mode
        })
        assert response.status_code == 200
        assert response.data.decode() == "Game deleted successfully."

def test_get_tv_games(test_client):
    user_id = 'test_user_id'
    headers = get_auth_headers(user_id)

    with patch('services.game.GameService.get_tv') as mock_get_tv:
        mock_get_tv.return_value = [{"id": "tv_game_id"}]

        response = test_client.get('/api/games/tv', headers=headers)
        assert response.status_code == 200
        assert 'games' in response.json

def test_get_all_games(test_client):
    user_id = 'test_user_id'
    headers = get_auth_headers(user_id)

    with patch('services.game.GameService.get_all') as mock_get_all:
        mock_get_all.return_value = [{"id": "all_game_id"}]

        response = test_client.get('/api/games', headers=headers)
        assert response.status_code == 200
        assert 'games' in response.json

def test_save_game_history(test_client):
    game_id = 'test_game_id'
    user_id = 'test_user_id'
    headers = get_auth_headers(user_id)

    with patch('services.game.GameService.save_game_history') as mock_save_game_history:
        mock_save_game_history.return_value = True

        response = test_client.post(f'/api/game/{game_id}/history', headers=headers, json={
            'result': 'test_result'
        })
        assert response.status_code == 200
        assert response.json['message'] == "Game history saved successfully."

def test_get_game_history(test_client):
    player_id = 'test_player_id'
    user_id = 'test_user_id'
    headers = get_auth_headers(user_id)

    with patch('services.game.GameService.get_game_history') as mock_get_game_history:
        mock_get_game_history.return_value = [{"id": "history_game_id"}]

        response = test_client.get(f'/api/player/{player_id}/history', headers=headers)
        assert response.status_code == 200
        assert isinstance(response.json, list)
