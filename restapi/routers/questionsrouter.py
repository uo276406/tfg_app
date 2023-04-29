from fastapi import APIRouter, status, Depends
from models.question import TextKeywords, QuestionsInfo
from questiongenerator.fillingapsgenerator import FillInGapsGenerator
from users.usersmanager import fastapi_users

router = APIRouter()

# This is a FastAPI dependency that checks if the user is authenticated.
current_active_user = fastapi_users.current_user(active=True)

"""
    This is a FastAPI endpoint that generates questions based on a given text and selected keywords.
    @param text_keywords - A request body containing the text body and selected keywords.
    @return list of Questions - The generated questions.
    """


@router.post("/generate", status_code=status.HTTP_200_OK, description="Generate questions", response_description="Generated questions form the text using the selected keywords", dependencies=[Depends(current_active_user)])
async def generate_questions(text_keywords: TextKeywords) -> QuestionsInfo:
    generator = FillInGapsGenerator()
    return generator.generate_questions(text_keywords.text_body, text_keywords.keywords_selected)
