from fastapi.testclient import TestClient
from urllib.parse import urlencode

from main import app

client = TestClient(app)


def test_find_keywords_not_auth_user():
    """ This test checks if the endpoint /api/v1.0/keywords/find works correctly with an unauthenticated user.

    """
    response = client.post("/api/v1.0/keywords/find",
                           json={"text_body": "This is an example text to test the restapi"})
    assert response.status_code == 401
    assert response.json() == {
        "detail": "Unauthorized"}


def test_find_keywords_auth_user():
    """ This test checks if the endpoint /api/v1.0/keywords/find works correctly with an authenticated user.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.post("/api/v1.0/keywords/find",
                           headers={"Authorization": "Bearer " + access_token},
                           json={"text_body": "This is an example text to test the restapi"})
    assert response.status_code == 200
    assert response.json() == {
        "keywords": [{'index': 0, 'value': 'example text'}]}
