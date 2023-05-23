from fastapi.testclient import TestClient
from urllib.parse import urlencode

from main import app

client = TestClient(app)


def test_generate_questions_not_auth_user():
    """ This test checks if the endpoint /api/v1.0/questions/generate works correctly with an unauthenticated user.

    """
    response = client.post("/api/v1.0/questions/generate",
                           json={"text_body": "Globalization, the ever-increasing interconnectedness, is not a new phenomenon, but it accelerated when western Europeans discovered the riches of the East. During the Crusades (1095–1291), Europeans developed an appetite for spices, silk, porcelain, sugar, and other luxury items from the East, for which they traded fur, timber, and Slavics they captured and sold (hence the word slave). But when the Silk Road, the long overland trading route from China to the Mediterranean, became costlier and more dangerous to travel, Europeans searched for a more efficient and inexpensive trade route over water, initiating the development of what we now call the Atlantic World. ", "keywords_selected": [{"value": "Globalization", "numberOfQuestions": 1}]
                                 })
    assert response.status_code == 401
    assert response.json() == {
        "detail": "Unauthorized"}


def test_find_keywords_auth_user():
    """ This test checks if the endpoint /api/v1.0/questions/generate works correctly with an authenticated user.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.post("/api/v1.0/questions/generate",
                           headers={"Authorization": "Bearer " + access_token},
                           json={"text_body": "Globalization, the ever-increasing interconnectedness, is not a new phenomenon, but it accelerated when western Europeans discovered the riches of the East. During the Crusades (1095–1291), Europeans developed an appetite for spices, silk, porcelain, sugar, and other luxury items from the East, for which they traded fur, timber, and Slavics they captured and sold (hence the word slave). But when the Silk Road, the long overland trading route from China to the Mediterranean, became costlier and more dangerous to travel, Europeans searched for a more efficient and inexpensive trade route over water, initiating the development of what we now call the Atlantic World. ", "keywords_selected": [{"value": "silk", "numberOfQuestions": 1}]
                                 })
    assert response.status_code == 200
    assert len(response.json()["questions"]) == 1 
