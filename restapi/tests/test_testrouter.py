from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.test import Test
from models.teststudent import TestStudent
from models.question import Question
from models.option import Option

from urllib.parse import urlencode
import pytest as pytest

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
    tests = db.query(Test).filter(Test.id != "must-leave-cold-student").all()
    for test in tests:
        db.delete(test)
    questions = db.query(Question).filter(
        Question.test_id != "must-leave-cold-student").all()
    for question in questions:
        db.delete(question)
    options = db.query(Option).filter(Option.question_id !=
                                      "f45584bf-ae8e-4133-a4a4-7d55177c8ed7").all()
    for option in options:
        db.delete(option)
    test = db.query(Test).filter(Test.id == "must-leave-cold-student").first()
    test.open = True
    db.execute(TestStudent.update().where((TestStudent.c.test_id == "must-leave-cold-student")
                              & (TestStudent.c.student_id == "estudiante1")).values(score=0, finished=False))
    db.commit()
    db.close()


client = TestClient(app)


def test_add_new_test_nologin():
    """ This test checks if the endpoint /api/v1.0/test/add works correctly without login.

    """
    response = client.post("/api/v1.0/test/add",
                           headers={
                               "Content-Type": "application/json"},
                           json={"questions": [{"question": " Enunciado prueba ", "options": [{"value": " opcion1", "correct": True}, {"value": "opcion2", "correct": False}, {"value": "opcion3", "correct": False}, {"value": "opción4", "correct": False}], "repeated": False}], "jump": True, "feedback": True})
    assert response.status_code == 401


def test_add_new_test():
    """ This test checks if the endpoint /api/v1.0/test/add works correctly .

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.post("/api/v1.0/test/add",
                           headers={
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + access_token},
                           json={"questions": [{"question": " Enunciado prueba ", "options": [{"value": " opcion1", "correct": True}, {"value": "opcion2", "correct": False}, {"value": "opcion3", "correct": False}, {"value": "opción4", "correct": False}], "repeated": False}], "jump": True, "feedback": True})
    assert response.status_code == 201
    assert response.json()["detail"] == "Test created successfully"


def test_close_test():
    """ This test checks if the endpoint /api/v1.0/test/changestatus works correctly .

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.post("/api/v1.0/test/changestatus",
                           headers={
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + access_token},
                           json={"id": "must-leave-cold-student", "open": False})
    assert response.status_code == 200
    assert response.json()["detail"] == "Test status updated"


def test_find_test_results():
    """ This test checks if the endpoint /api/v1.0/test/find/results works correctly .

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.get("/api/v1.0/test/find/results",
                          headers={
                              "Content-Type": "application/json",
                              "Authorization": "Bearer " + access_token})
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_find_existing_test_by_id():
    """ This test checks if the endpoint /api/v1.0/test/{test_id} works correctly .

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.get("/api/v1.0/test/must-leave-cold-student",
                          headers={
                              "Content-Type": "application/json",
                              "Authorization": "Bearer " + access_token})
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_find_not_existing_test_by_id():
    """ This test checks if the endpoint /api/v1.0/test/{test_id} works correctly for non existing test.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.get("/api/v1.0/test/must-leave-cold",
                          headers={
                              "Content-Type": "application/json",
                              "Authorization": "Bearer " + access_token})
    assert response.status_code == 200
    assert response.json() == {"detail": "Test not found"}


def test_find_closed_test_by_id():
    """ This test checks if the endpoint /api/v1.0/test/{test_id} works correctly for closed tests.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]
    client.post("/api/v1.0/test/changestatus",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token},
                json={"id": "must-leave-cold-student", "open": False})

    response = client.get("/api/v1.0/test/must-leave-cold-student",
                          headers={
                              "Content-Type": "application/json",
                              "Authorization": "Bearer " + access_token})
    assert response.status_code == 200
    assert response.json() == {"detail": "Test is closed"}


def test_check_closed_test():
    """ This test checks if the endpoint /api/v1.0/test/check works correctly for closed tests.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]
    client.post("/api/v1.0/test/changestatus",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token},
                json={"id": "must-leave-cold-student", "open": False})

    response = client.post("/api/v1.0/test/check",
                           headers={
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + access_token},
                           json={"testId": "must-leave-cold-student", "studentId": "estudiante1", "selection": [-1]})
    assert response.status_code == 200
    assert response.json() == {"detail": "Test is closed"}


def test_check_non_existing_test():
    """ This test checks if the endpoint /api/v1.0/test/check works correctly for non existing tests.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.post("/api/v1.0/test/check",
                           headers={
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + access_token},
                           json={"testId": "must-leave-cold-stud", "studentId": "estudiante1", "selection": [-1]})
    assert response.status_code == 200
    assert response.json() == {"detail": "Test not found"}


def test_check_test_failed():
    """ This test checks if the endpoint /api/v1.0/test/check works correctly for a test failed.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.post("/api/v1.0/test/check",
                           headers={
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + access_token},
                           json={"testId": "must-leave-cold-student", "studentId": "estudiante1", "selection": [-1]})
    assert response.status_code == 201
    assert response.json()['score'] == 0


def test_check_test_passed():
    """ This test checks if the endpoint /api/v1.0/test/check works correctly for a test passed.

    """
    encoded_data = urlencode(
        {"username": "profesor1@uniovi.es", "password": "Profesor1"})
    access_token = client.post("/api/v1.0/auth/login/",
                               headers={
                                   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                               content=encoded_data).json()["access_token"]

    response = client.post("/api/v1.0/test/check",
                           headers={
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + access_token},
                           json={"testId": "must-leave-cold-student", "studentId": "estudiante1", "selection": [0]})
    assert response.status_code == 201
    assert response.json()['score'] == 1
