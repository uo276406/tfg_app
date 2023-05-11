from fastapi import APIRouter, status
from pydantic import BaseModel
from repository.studentquestionrepository import insert_student_question, get_student_questions_by_ids, update_student_question as update_repo_student_question, get_student_questions_combination
from repository.questionsrepository import get_questions_by_test

router = APIRouter()

# Modelos de datos: Request ----------------------------------------

class Answer(BaseModel):
    student_id: str
    question_id: str
    option: int

# ---------------------------------------------------------


@router.post("/add", status_code=status.HTTP_201_CREATED, description="Adds new answer done by the user")
async def add_student_question(answer: Answer):
    question_answered = await get_student_questions_by_ids(answer.student_id, answer.question_id)
    if len(question_answered) == 0:
        await insert_student_question(answer.student_id, answer.question_id, answer.option)
        return {"message": "Answer added successfully"}
    else:
        return {"message": "Question already answered"}
    

@router.put("/update/{student_id}/{question_id}/{option}", status_code=status.HTTP_200_OK, description="Updates the answer done by the user")
async def update_student_question(student_id: str, question_id: str, option: int):
    question_answered = await get_student_questions_by_ids(student_id, question_id)
    if len(question_answered) != 0:
        await update_repo_student_question(student_id, question_id, option)
        return {"message": "Answer updated successfully"}
    else:
        return {"message": "Question not answered yet"}
    
@router.get("/combination/{student_id}/{question_id}", status_code=status.HTTP_200_OK, description="Gets the answer done by the user")
async def get_student_question_combination(student_id: str, question_id: str):
    question_answered = await get_student_questions_combination(student_id, question_id)
    if question_answered != None:
        return question_answered[0]
    else:
        return {"message": "Question not answered yet"}

@router.get("/answered/{student_id}/test/{test_id}", status_code=status.HTTP_200_OK, description="Gets the answer answered by the user")
async def get_student_answered_questions(student_id: str, test_id: str):
    res = {test_id: {student_id: {"number_answered": 0}}}
    questions_of_test = await get_questions_by_test(test_id)
    for question in questions_of_test:
        question_answered = await get_student_questions_combination(student_id, question.id)
        if question_answered[0] != -1:
            res[test_id][student_id]["number_answered"] += 1
    return res