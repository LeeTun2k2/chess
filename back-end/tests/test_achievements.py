import json
import pytest
from flask_jwt_extended import create_access_token
from server import app
from services.achievement import AchievementService
from services.auth import AuthServices

@pytest.fixture(scope='module')
def new_achievement():
    return {
        "event": "Test Event",
        "time": "2022-01-01",
        "member": "Test Member",
        "reward": "Test Reward"
    }

@pytest.fixture
def access_token():
    authService = AuthServices()
    ok, token = authService.login("hien2k311", "mot234nam6")
    return token

def test_get_all_achievements(test_client, new_achievement):
    achievement_service = AchievementService()
    achievement_service.create(new_achievement)

    response = test_client.get('/api/achievements')
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["message"] == "success"
    assert len(data["achievements"]) > 0

def test_get_honor_list(test_client):
    response = test_client.get('/api/achievements/honor-list')
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["message"] == "success"

def test_get_achievement_by_id(test_client, new_achievement):
    achievement_service = AchievementService()
    achievement = achievement_service.create(new_achievement)

    response = test_client.get(f'/api/achievements/{achievement.id}')
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["message"] == "success"
    assert data["achievement"]["event"] == new_achievement["event"]

def test_create_achievement(test_client, new_achievement, access_token):
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = test_client.post('/api/achievements', json=new_achievement, headers=headers)
    data = json.loads(response.data.decode())

    assert response.status_code == 201
    assert data["message"] == "success"
    assert data["achievement"]["event"] == new_achievement["event"]

def test_update_achievement(test_client, new_achievement, access_token):
    achievement_service = AchievementService()
    achievement = achievement_service.create(new_achievement)

    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    updated_data = {
        "event": "Updated Event",
        "time": "2022-01-01",
        "member": "Updated Member",
        "reward": "Updated Reward"
    }

    response = test_client.put(f'/api/achievements/{achievement.id}', json=updated_data, headers=headers)
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["message"] == "success"

def test_delete_achievement(test_client, new_achievement, access_token):
    achievement_service = AchievementService()
    achievement = achievement_service.create(new_achievement)

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = test_client.delete(f'/api/achievements/{achievement.id}', headers=headers)
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["message"] == "achievement deleted successfully"

def test_get_top_achievements(test_client, new_achievement):
    achievement_service = AchievementService()
    for i in range(5):
        achievement_service.create({
            "event": f"Event {i}",
            "time": "2022-01-01",
            "member": f"Member {i}",
            "reward": f"Reward {i}"
        })

    response = test_client.get('/api/achievements/top/3')
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["message"] == "success"
    assert len(data["achievements"]) == 3
