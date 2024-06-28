import pytest
import json
from unittest.mock import patch
from flask_jwt_extended import create_access_token, create_refresh_token

def test_login_google_existing_user(test_client):
    # Dữ liệu đầu vào cho API
    login_data = {
        'email': 'existing_user@example.com',
        'name': 'Existing User'
    }
    
    # Mocks
    with patch('services.user.UserService.get_by_email') as mock_get_by_email, \
         patch('services.user.UserService.users_collection.insert_one') as mock_insert_one:
        
        # Giả lập người dùng đã tồn tại
        mock_user = {
            'id': 'test_user_id',
            'email': login_data['email'],
            'name': login_data['name'],
            'is_verified': True,
            'is_locked': False,
            'role': 'PLAYER'
        }
        
        mock_get_by_email.return_value = type('obj', (object,), mock_user)
        
        # Gửi yêu cầu POST tới API
        response = test_client.post('/api/login-google', json=login_data)
        
        # Kiểm tra mã trạng thái HTTP
        assert response.status_code == 200
        
        # Kiểm tra dữ liệu trả về
        data = json.loads(response.data)
        assert 'access_token' in data
        assert 'refresh_token' in data
        assert 'user' in data
        assert data['user']['email'] == login_data['email']
        assert data['user']['name'] == login_data['name']

def test_login_google_new_user(test_client):
    # Dữ liệu đầu vào cho API
    login_data = {
        'email': 'new_user@example.com',
        'name': 'New User'
    }
    
    # Mocks
    with patch('services.user.UserService.get_by_email') as mock_get_by_email, \
         patch('services.user.UserService.users_collection.insert_one') as mock_insert_one:
        
        # Giả lập người dùng chưa tồn tại
        mock_get_by_email.side_effect = [None, type('obj', (object,), {
            'id': 'new_user_id',
            'email': login_data['email'],
            'name': login_data['name'],
            'is_verified': True,
            'is_locked': False,
            'role': 'PLAYER'
        })]
        
        # Gửi yêu cầu POST tới API
        response = test_client.post('/api/login-google', json=login_data)
        
        # Kiểm tra mã trạng thái HTTP
        assert response.status_code == 200
        
        # Kiểm tra dữ liệu trả về
        data = json.loads(response.data)
        assert 'access_token' in data
        assert 'refresh_token' in data
        assert 'user' in data
        assert data['user']['email'] == login_data['email']
        assert data['user']['name'] == login_data['name']

def test_login_google_fail(test_client):
    # Dữ liệu đầu vào cho API
    login_data = {
        'email': 'error_user@example.com',
        'name': 'Error User'
    }
    
    # Mocks
    with patch('services.user.UserService.get_by_email') as mock_get_by_email:
        
        # Giả lập ngoại lệ xảy ra khi gọi get_by_email
        mock_get_by_email.side_effect = Exception('Database error')
        
        # Gửi yêu cầu POST tới API
        response = test_client.post('/api/login-google', json=login_data)
        
        # Kiểm tra mã trạng thái HTTP
        assert response.status_code == 500
        
        # Kiểm tra dữ liệu trả về
        assert response.data.decode('utf-8') == 'Fail to log in.'

