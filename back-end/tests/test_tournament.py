import json
import pytest
from unittest.mock import patch, MagicMock
from flask_jwt_extended import create_access_token

@pytest.fixture(scope='module')
def access_token():
    return create_access_token(identity='test_user_id')

def test_get_all_tournaments(test_client):
    with patch('services.tournament.TournamentService.get_all') as mock_get_all:
        mock_get_all.return_value = [{"id": 1, "name": "Test Tournament"}]
        
        response = test_client.get('/api/tournaments')
        
        assert response.status_code == 200
        assert len(response.json['tournaments']) == 1
        assert response.json['tournaments'][0]['name'] == "Test Tournament"

def test_get_tournament_by_id(test_client):
    tournament_id = '1'
    with patch('services.tournament.TournamentService.get') as mock_get:
        mock_get.return_value = {"id": tournament_id, "name": "Test Tournament"}
        
        response = test_client.get(f'/api/tournaments/{tournament_id}')
        
        assert response.status_code == 200
        assert response.json['tournament']['id'] == tournament_id
        assert response.json['tournament']['name'] == "Test Tournament"

def test_get_game_in_tournament(test_client, access_token):
    tournament_id = '1'
    user_id = 'test_user_id'
    with patch('services.user.UserService.get_by_id') as mock_get_user:
        mock_get_user.return_value = MagicMock(id=user_id)
        
        with patch('services.game.GameService.get_by_tournament_id') as mock_get_games:
            mock_get_games.return_value = [
                {"id": 1, "white": user_id, "black": "another_user_id"},
                {"id": 2, "white": "yet_another_user_id", "black": user_id}
            ]
            
            response = test_client.get(f'/api/tournaments/{tournament_id}/your-games',
                                       headers={'Authorization': f'Bearer {access_token}'})
            
            assert response.status_code == 200
            assert len(response.json['games']) == 1
            assert response.json['games'][0]['id'] == 1

def test_create_tournament(test_client, access_token):
    new_tournament_data = {
        "name": "New Tournament",
        "description": "This is a new tournament.",
        "variant": "Standard",
        "initial_time": 1800,
        "bonus_time": 30,
        "start": "2024-07-01T12:00:00Z",
        "end": "2024-07-10T12:00:00Z"
    }
    
    with patch('services.tournament.TournamentService.create') as mock_create:
        mock_create.return_value = new_tournament_data
        
        response = test_client.post('/api/tournaments',
                                    data=json.dumps(new_tournament_data),
                                    content_type='application/json',
                                    headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 201
        assert response.json['tournament']['name'] == new_tournament_data['name']

def test_update_tournament(test_client, access_token):
    tournament_id = '1'
    updated_tournament_data = {
        "name": "Updated Tournament",
        "description": "This is an updated tournament.",
        "variant": "Blitz",
        "initial_time": 300,
        "bonus_time": 10,
        "start": "2024-07-02T12:00:00Z",
        "end": "2024-07-12T12:00:00Z"
    }
    
    with patch('services.tournament.TournamentService.update') as mock_update:
        mock_update.return_value = True
        
        response = test_client.put(f'/api/tournaments/{tournament_id}',
                                   data=json.dumps(updated_tournament_data),
                                   content_type='application/json',
                                   headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 200

def test_update_tournament_not_found(test_client, access_token):
    tournament_id = 'nonexistent_id'
    updated_tournament_data = {
        "name": "Updated Tournament",
        "description": "This is an updated tournament.",
        "variant": "Blitz",
        "initial_time": 300,
        "bonus_time": 10,
        "start": "2024-07-02T12:00:00Z",
        "end": "2024-07-12T12:00:00Z"
    }
    
    with patch('services.tournament.TournamentService.update') as mock_update:
        mock_update.return_value = False
        
        response = test_client.put(f'/api/tournaments/{tournament_id}',
                                   data=json.dumps(updated_tournament_data),
                                   content_type='application/json',
                                   headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 404

def test_delete_tournament(test_client, access_token):
    tournament_id = '1'
    with patch('services.tournament.TournamentService.delete') as mock_delete:
        mock_delete.return_value = True
        
        response = test_client.delete(f'/api/tournaments/{tournament_id}',
                                      headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 200

def test_delete_tournament_not_found(test_client, access_token):
    tournament_id = 'nonexistent_id'
    with patch('services.tournament.TournamentService.delete') as mock_delete:
        mock_delete.return_value = False
        
        response = test_client.delete(f'/api/tournaments/{tournament_id}',
                                      headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 404

def test_join_tournament(test_client, access_token):
    tournament_id = '1'
    with patch('services.tournament.TournamentService.join') as mock_join:
        mock_join.return_value = True
        
        response = test_client.post(f'/api/tournaments/{tournament_id}/join',
                                    headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 200

def test_leave_tournament(test_client, access_token):
    tournament_id = '1'
    with patch('services.tournament.TournamentService.leave') as mock_leave:
        mock_leave.return_value = True
        
        response = test_client.delete(f'/api/tournaments/{tournament_id}/leave',
                                      headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 200

def test_get_tournament_scoreboard(test_client):
    tournament_id = '1'
    with patch('services.tournament.TournamentService.get_scoreboard') as mock_get_scoreboard:
        mock_get_scoreboard.return_value = {"player1": 3, "player2": 2, "player3": 1}
        
        response = test_client.get(f'/api/tournaments/{tournament_id}/scoreboard')
        
        assert response.status_code == 200
        assert response.json['scoreboard']['player1'] == 3

def test_get_tournament_scoreboard_not_found(test_client):
    tournament_id = 'nonexistent_id'
    with patch('services.tournament.TournamentService.get_scoreboard') as mock_get_scoreboard:
        mock_get_scoreboard.return_value = None
        
        response = test_client.get(f'/api/tournaments/{tournament_id}/scoreboard')
        
        assert response.status_code == 404

def test_get_tournament_game_history(test_client, access_token):
    tournament_id = '1'
    with patch('services.tournament.TournamentService.get_user_game_history') as mock_get_game_history:
        mock_get_game_history.return_value = [{"game_id": 1, "result": "win"}, {"game_id": 2, "result": "draw"}]
        
        response = test_client.get(f'/api/tournaments/{tournament_id}/game-history',
                                   headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 200
        assert len(response.json['game_history']) == 2
        assert response.json['game_history'][0]['game_id'] == 1

def test_get_tournament_game_history_not_found(test_client, access_token):
    tournament_id = 'nonexistent_id'
    with patch('services.tournament.TournamentService.get_user_game_history') as mock_get_game_history:
        mock_get_game_history.return_value = None
        
        response = test_client.get(f'/api/tournaments/{tournament_id}/game-history',
                                   headers={'Authorization': f'Bearer {access_token}'})
        
        assert response.status_code == 404
