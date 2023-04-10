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
    return [
        {
            'question': 'blablabla1',
            'options': [
                {'value': 'a', 'correct': False},
                {'value': 'b', 'correct': False},
                {'value': 'c', 'correct': True},
                {'value': 'd', 'correct': False}
            ]
        },
        {
            'question': 'blablabla2',
            'options': [
                {'value': 'a', 'correct': False},
                {'value': 'b', 'correct': False},
                {'value': 'c', 'correct': True},
                {'value': 'd', 'correct': False}
            ]
        },
        {
            'question': 'blablabla3',
            'options': [
                {'value': 'a', 'correct': False},
                {'value': 'b', 'correct': False},
                {'value': 'c', 'correct': True},
                {'value': 'd', 'correct': False}
            ]
        }
    ]
