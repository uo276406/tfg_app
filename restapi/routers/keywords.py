from fastapi import APIRouter
from pydantic import BaseModel
from keywordalgorithm.keywordextractor import KeywordExtractor

router = APIRouter()

# Modelos de datos ----------------------------------------

class Text(BaseModel):
    text_body: str

# ---------------------------------------------------------

"""
    This is a FastAPI endpoint that takes in a POST request with a JSON payload containing a "text" field. The text field is passed to a KeywordExtractor object, which extracts keywords from the text. The extracted keywords are then returned as a JSON response. 
"""
@router.post("/find")
async def find_keywords(text: Text):
    extractor = KeywordExtractor(text.text_body)
    return extractor.extract_keywords()