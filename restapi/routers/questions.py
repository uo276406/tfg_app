from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Modelos de datos ----------------------------------------


class Keyword(BaseModel):
    value: str


class TextKeywords(BaseModel):
    text_body: str
    keywords_selected: list[Keyword]

# ---------------------------------------------------------


@router.post("/generate")
async def generate_questions(text_keywords: TextKeywords):
    return {'questions': [
        {
            'question1': 'blablabla',
            'options1': ['a', 'b', 'b']
        },
        {
            'question2': 'blablabla',
            'options2': ['a2', 'b2', 'b2']
        },
    ]}
