from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.user import User

from urllib.parse import urlencode
import pytest

from main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./development.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)


@pytest.fixture(autouse=True)
def setup_and_teardown():
    print("Setting up...")
    yield
    print("Tearing down...")
    session = sessionmaker(
        autocommit=False, autoflush=False, bind=engine)
    db = session()
    users = db.query(User).filter(User.name == "Test").all()
    for user in users:
        db.delete(user)
    db.commit()
    db.close()


client = TestClient(app)


def test_login():
    """ This test checks if the endpoint /api/v1.0/auth/login works correctly with a correct email and password.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    response = client.post("/api/v1.0/auth/login/",
                           headers={
                               "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                           content=encoded_data)
    assert response.status_code == 200


def test_login_bad_email():
    """ This test checks if the endpoint /api/v1.0/auth/login works correctly with a bad email.

    """
    encoded_data = urlencode(
        {"username": "profesorMal@uniovi.es", "password": "Profesor1"})
    response = client.post("/api/v1.0/auth/login/",
                           headers={
                               "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                           content=encoded_data)
    assert response.status_code == 400
    assert response.json() == {"detail": "LOGIN_BAD_CREDENTIALS"}


def test_login_bad_password():
    """ This test checks if the endpoint /api/v1.0/auth/login works correctly with a bad password.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1Mal"})
    response = client.post("/api/v1.0/auth/login/",
                           headers={
                               "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                           content=encoded_data)
    assert response.status_code == 400
    assert response.json() == {"detail": "LOGIN_BAD_CREDENTIALS"}


def test_signin():
    """ This test checks if the endpoint /api/v1.0/auth/register works correctly.

    """
    response = client.post("/api/v1.0/auth/register/",
                           headers={
                               "Content-Type": "application/json"},
                           json={"email": "test@test.com", "password": "Test1234", "name": "Test", "surname1": "Test", "surname2": "Test"})
    assert response.status_code == 201

    client.delete("/api/v1.0/users/" + response.json()["id"])


def test_signin_existing_email():
    """ This test checks if the endpoint /api/v1.0/auth/register works correctly with an existing email.

    """
    response = client.post("/api/v1.0/auth/register/",
                           headers={
                               "Content-Type": "application/json"},
                           json={"email": "profesor1@uniovi.es", "password": "Test1234", "name": "Test", "surname1": "Test", "surname2": "Test"})
    assert response.status_code == 400
    assert response.json() == {"detail": "REGISTER_USER_ALREADY_EXISTS"}


def test_signin_short_password():
    """ This test checks if the endpoint /api/v1.0/auth/register works correctly with a short password.

    """
    response = client.post("/api/v1.0/auth/register/",
                           headers={
                               "Content-Type": "application/json"},
                           json={"email": "test@test.com", "password": "Test1", "name": "Test", "surname1": "Test", "surname2": "Test"})
    assert response.status_code == 400
    assert response.json() == {"detail": {
        "code": "REGISTER_INVALID_PASSWORD",
        "reason": "Password should be at least 6 characters"
    }}


def test_signin_password_blankspaces():
    """ This test checks if the endpoint /api/v1.0/auth/register works correctly with a password with blankspaces.

    """
    response = client.post("/api/v1.0/auth/register/",
                           headers={
                               "Content-Type": "application/json"},
                           json={"email": "test@test.com", "password": "Tes t1", "name": "Test", "surname1": "Test", "surname2": "Test"})
    assert response.status_code == 400
    assert response.json() == {"detail": {
        "code": "REGISTER_INVALID_PASSWORD",
        "reason": "Password should not contain blankspaces"
    }}


def test_signin_password_no_digits():
    """ This test checks if the endpoint /api/v1.0/auth/register works correctly with a password with no digit.

    """
    response = client.post("/api/v1.0/auth/register/",
                           headers={
                               "Content-Type": "application/json"},
                           json={"email": "test@test.com", "password": "Testpr", "name": "Test", "surname1": "Test", "surname2": "Test"})
    assert response.status_code == 400
    assert response.json() == {"detail": {
        "code": "REGISTER_INVALID_PASSWORD",
        "reason": "Password should contain at least one digit"
    }}


def test_signin_password_no_downcase():
    """ This test checks if the endpoint /api/v1.0/auth/register works correctly with a password with no downcase letter.

    """
    response = client.post("/api/v1.0/auth/register/",
                           headers={
                               "Content-Type": "application/json"},
                           json={"email": "test@test.com", "password": "TEST12", "name": "Test", "surname1": "Test", "surname2": "Test"})
    assert response.status_code == 400
    assert response.json() == {"detail": {
        "code": "REGISTER_INVALID_PASSWORD",
        "reason": "Password should contain at least one downcase letter"
    }}


def test_signin_password_no_uppercase():
    """ This test checks if the endpoint /api/v1.0/auth/register works correctly with a password with no uppercase letter.

    """
    response = client.post("/api/v1.0/auth/register/",
                           headers={
                               "Content-Type": "application/json"},
                           json={"email": "test@test.com", "password": "test12", "name": "Test", "surname1": "Test", "surname2": "Test"})
    assert response.status_code == 400
    assert response.json() == {"detail": {
        "code": "REGISTER_INVALID_PASSWORD",
        "reason": "Password should contain at least one uppercase letter"
    }}
