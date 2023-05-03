from fastapi import APIRouter, status, Depends
from users.usersmanager import fastapi_users
from repository.testrepository import insert_test, get_tests_by_user
from repository.questionsrepository import insert_question, get_questions_by_test
from repository.answersrepository import insert_answer, get_answers_by_question
from models.user import User
from pydantic import BaseModel
import uuid

router = APIRouter()

# Modelos: Request --------------------------------------------------


class Answer(BaseModel):
    value: str
    correct: bool


class Question(BaseModel):
    question: str
    options: list[Answer]


class Test(BaseModel):
    questions: list[Question]


# This is a FastAPI dependency that checks if the user is authenticated.
current_active_user = fastapi_users.current_user(active=True)

@router.post("/add", status_code=status.HTTP_200_OK, description="Add new test generated by the user based on the questions", response_description="Add new test generated by the user")
async def add_test(test: Test, user: User = Depends(current_active_user)):
    new_test = {"id": str(uuid.uuid4()), "user_id": str(user.id)}
    await insert_test(new_test)
    for question in test.questions:
        question_id = str(uuid.uuid4())
        await insert_question({"id": question_id, "question_text": question.question, "test_id": new_test["id"]})
        for option in question.options:
            await insert_answer({"id": str(uuid.uuid4()), "value": option.value, "is_correct": option.correct, "question_id": question_id})


@router.get("/find", status_code=status.HTTP_200_OK, description="Get all the test that one user has generated", response_description="Find all tests generated by the user")
async def get_tests(user: User = Depends(current_active_user)):
    res = []
    tests_found = await get_tests_by_user(user.id)
    for test in tests_found:
        test_found = {"id": test.id, "user_id": test.user_id, "questions": []}
        questions_found = await get_questions_by_test(test.id)
        for question in questions_found:
            question_found = {"id": question.id, "question_text": question.question_text, "test_id": question.test_id, "options": []}
            answers_found = await get_answers_by_question(question.id)
            for answer in answers_found:
                answer_found = {"id": answer.id, "value": answer.value, "is_correct": answer.is_correct, "question_id": answer.question_id}
                question_found["options"].append(answer_found)
            test_found["questions"].append(question_found)
        res.append(test_found)
    return res