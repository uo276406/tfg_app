from fastapi import APIRouter, status
from pydantic import BaseModel
from repository.studentquestionrepository import insert_student_question, get_student_questions_by_ids

router = APIRouter()

# Modelos de datos: Request ----------------------------------------


class Answer(BaseModel):
    answer: int
    question_id: str
    student_id: str

# ---------------------------------------------------------



"""
    This is a FastAPI endpoint that generates questions based on a given text and selected keywords.
    @param text_keywords - A request body containing the text body and selected keywords.
    @return list of Questions - The generated questions.
    """


@router.post("/add", status_code=status.HTTP_201_CREATED, description="Adds new answer done by the user")
async def add_student_question(answer: Answer):
    question_answered = await get_student_questions_by_ids(answer.student_id, answer.question_id)
    print(question_answered)
    if question_answered == None or question_answered.answer != -1:
        print(answer.student_id, answer.question_id, answer.answer)
        await insert_student_question(answer.student_id, answer.question_id, answer.answer)
        return {"message": "Answer added successfully"}
    else:
        return {"message": "Question already answered"}