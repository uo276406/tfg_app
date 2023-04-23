from fastapi import APIRouter, status
from pydantic import BaseModel
from questiongenerator.fillingapsgenerator import FillInGapsGenerator

router = APIRouter()

# Modelos de datos: Request ----------------------------------------


class Keyword(BaseModel):
    value: str


class TextKeywords(BaseModel):
    text_body: str
    keywords_selected: list[Keyword]


# Modelos de datos: Response ----------------------------------------


class Answer(BaseModel):
    value: str
    correct: bool


class Question(BaseModel):
    question: str
    options: list[Answer]


class QuestionsInfo(BaseModel):
    questions: list[Question]
    there_are_repeated: bool

# ---------------------------------------------------------


"""
    This is a FastAPI endpoint that generates questions based on a given text and selected keywords.
    @param text_keywords - A request body containing the text body and selected keywords.
    @return list of Questions - The generated questions.
    """


@router.post("/generate", status_code=status.HTTP_200_OK, description="Generate questions", response_description="Generated questions form the text using the selected keywords")
async def generate_questions(text_keywords: TextKeywords) -> QuestionsInfo:
    generator = FillInGapsGenerator()
    return generator.generate_questions(text_keywords.text_body, text_keywords.keywords_selected)
