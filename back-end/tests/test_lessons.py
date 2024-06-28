import json
import pytest
from flask_jwt_extended import create_access_token

def get_jwt_token(user_id, app):
    with app.test_request_context():
        token = create_access_token(identity=str(user_id))
    return token

@pytest.fixture(scope='module')
def new_lesson():
    return {
        "title": "New Lesson",
        "description": "This is a new lesson.",
        "content": "Lesson content here.",
        "author_id": "1"
    }

def test_create_lesson(test_client, new_lesson):
    # Get JWT token
    token = get_jwt_token(new_lesson["author_id"], test_client.application)
    
    response = test_client.post('/api/lessons',
                                data=json.dumps(new_lesson),
                                content_type='application/json',
                                headers={'Authorization': f'Bearer {token}'})
    
    assert response.status_code == 201
    assert response.json["title"] == new_lesson["title"]

def test_get_lessons(test_client):
    response = test_client.get('/api/lessons')
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_get_lesson_by_id(test_client, new_lesson):
    # Assuming there is a lesson with ID 1
    response = test_client.get('/api/lessons/1')
    assert response.status_code == 200
    assert response.json["title"] == new_lesson["title"]

def test_delete_lesson(test_client, new_lesson):
    # Get JWT token
    token = get_jwt_token(new_lesson["author_id"], test_client.application)
    
    response = test_client.delete('/api/lessons/1',
                                  headers={'Authorization': f'Bearer {token}'})
    
    assert response.status_code == 200
    assert response.data.decode() == 'Lesson deleted successfully'

def test_delete_lesson_unauthorized(test_client):
    # Assuming the lesson with ID 1 is authored by user with ID 1
    # Get JWT token for a different user
    token = get_jwt_token("2", test_client.application)
    
    response = test_client.delete('/api/lessons/1',
                                  headers={'Authorization': f'Bearer {token}'})
    
    assert response.status_code == 401
    assert response.data.decode() == 'Unauthorized'
