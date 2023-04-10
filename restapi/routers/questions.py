from fastapi import APIRouter
from pydantic import BaseModel
from questiongenerator.fillingapsgenerator import FillInGapsGenerator

router = APIRouter()

# Modelos de datos ----------------------------------------


class Keyword(BaseModel):
    value: str


class TextKeywords(BaseModel):
    text_body: str
    keywords_selected: list[Keyword]

# ---------------------------------------------------------

"""
    This is a FastAPI endpoint that generates questions based on a given text and selected keywords.
    @param text_keywords - A request body containing the text body and selected keywords.
    @return The generated questions.
    """
@router.post("/generate")
async def generate_questions(text_keywords: TextKeywords):
    generator = FillInGapsGenerator()
    return generator.generate_questions(text_keywords.text_body, text_keywords.keywords_selected)
    
