from fastapi import APIRouter
from pydantic import BaseModel
from keywordalgorithm.keywordextractor import KeywordExtractor

router = APIRouter()

# Modelos de datos ----------------------------------------

class Text(BaseModel):
    text_body: str

# ---------------------------------------------------------

@router.post("/find")
async def find_keywords(text: Text):
    extractor = KeywordExtractor()
    return extractor.extract_keywords(text.text_body)