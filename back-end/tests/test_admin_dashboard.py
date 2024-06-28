import pytest
import json

def test_get_ajax_request_http_method(test_client):
    response = test_client.get('/api/dashboard/ajax_request_http_method')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_ajax_request_hostname(test_client):
    response = test_client.get('/api/dashboard/ajax_request_hostname')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_ajax_request_page_url(test_client):
    response = test_client.get('/api/dashboard/ajax_request_page_url')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_browser_interaction(test_client):
    response = test_client.get('/api/dashboard/browser_interaction')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_ajax_request_http_response_code_hostname(test_client):
    response = test_client.get('/api/dashboard/ajax_request_http_response_code_hostname')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_transaction_summary(test_client):
    response = test_client.get('/api/dashboard/transaction_summary')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_failed_transactions(test_client):
    response = test_client.get('/api/dashboard/failed_transactions')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_metric_summary(test_client):
    response = test_client.get('/api/dashboard/metric_summary')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_apdex(test_client):
    response = test_client.get('/api/dashboard/apdex')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"

def test_get_web_transaction_facet_name(test_client):
    response = test_client.get('/api/dashboard/web_transaction_facet_name')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert data["message"] == "success"
