import json
import pytest
from flask_jwt_extended import create_access_token
from unittest.mock import patch, MagicMock

# Helper function to get a JWT token for a given user_id
def get_jwt_token(user_id, app):
    with app.test_request_context():
        token = create_access_token(identity=str(user_id))
    return token

@pytest.fixture(scope='module')
def new_notification():
    return {
        "title": "New Notification",
        "description": "This is a new notification."
    }

def test_get_all_notifications(test_client):
    response = test_client.get('/api/notifications')
    assert response.status_code == 200
    assert "notifications" in response.json

def test_get_notification_by_id(test_client):
    response = test_client.get('/api/notifications/1')
    if response.status_code == 200:
        assert "notification" in response.json
    else:
        assert response.status_code == 404

@patch('services.user.UserService.get_by_id')
@patch('services.game.GameService.get_by_notification_id')
def test_get_game_in_notification(mock_get_by_notification_id, mock_get_user, test_client):
    mock_user = MagicMock()
    mock_user.id = '1'
    mock_get_user.return_value = mock_user
    
    mock_game = {
        "id": "game1",
        "white": "1",
        "black": "2",
        "result": "white wins"
    }
    mock_get_by_notification_id.return_value = [mock_game]
    
    token = get_jwt_token(mock_user.id, test_client.application)
    
    response = test_client.get('/api/notifications/1/your-games',
                               headers={'Authorization': f'Bearer {token}'})
    
    assert response.status_code == 200
    assert "games" in response.json
    assert response.json["games"][0]["id"] == "game1"

@patch('services.notification.NotificationService.create')
def test_create_notification(mock_create, test_client, new_notification):
    mock_create.return_value = new_notification
    
    token = get_jwt_token("test_user_id", test_client.application)
    
    response = test_client.post('/api/notifications',
                                data=json.dumps(new_notification),
                                content_type='application/json',
                                headers={'Authorization': f'Bearer {token}'})
    
    assert response.status_code == 201
    assert response.json["title"] == new_notification["title"]

@patch('services.notification.NotificationService.update')
def test_update_notification(mock_update, test_client):
    mock_update.return_value = True
    
    token = get_jwt_token("test_user_id", test_client.application)
    
    update_data = {
        "title": "Updated Notification",
        "description": "This is an updated notification."
    }
    
    response = test_client.put('/api/notifications/1',
                               data=json.dumps(update_data),
                               content_type='application/json',
                               headers={'Authorization': f'Bearer {token}'})
    
    assert response.status_code == 200

@patch('services.notification.NotificationService.delete')
def test_delete_notification(mock_delete, test_client):
    mock_delete.return_value = True
    
    token = get_jwt_token("test_user_id", test_client.application)
    
    response = test_client.delete('/api/notifications/1',
                                  headers={'Authorization': f'Bearer {token}'})
    
    assert response.status_code == 200

def test_get_top_notifications(test_client):
    response = test_client.get('/api/notifications/top')
    assert response.status_code == 200
    assert "notifications" in response.json
