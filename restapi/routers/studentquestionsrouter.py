from fastapi import APIRouter, status
from pydantic import BaseModel
from repository.studentquestionrepository import insert_student_question, get_student_questions_by_ids, update_student_question as update_repo_student_question

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
    if question_answered == None or question_answered.answer != -1:
        await insert_student_question(answer.student_id, answer.question_id, answer.option)
        return {"message": "Answer added successfully"}
    else:
        return {"message": "Question already answered"}
    

@router.put("/update/{student_id}/{question_id}/{option}", status_code=status.HTTP_200_OK, description="Updates the answer done by the user")
async def update_student_question(student_id: str, question_id: str, option: int):
    question_answered = await get_student_questions_by_ids(student_id, question_id)
    if question_answered != None:
        await update_repo_student_question(student_id, question_id, option)
        return {"message": "Answer updated successfully"}
    else:
        return {"message": "Question not answered yet"}