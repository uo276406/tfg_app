from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

def test_root():
    response = client.get("/api/v1.0/")
    assert response.status_code == 200
    assert response.json() == {"detail": "This is an API REST to found keywords in a text"}