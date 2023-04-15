from fastapi import APIRouter, status
from pydantic import BaseModel
from keywordalgorithm.keywordextractor import KeywordExtractor

router = APIRouter()

# Modelos de datos: Request ----------------------------------------


class Text(BaseModel):
    text_body: str


# Modelos de datos: Response ----------------------------------------


class KeywordFound(BaseModel):
    index: int
    value: str


class ListKeywordsFound(BaseModel):
    keywords: list[KeywordFound]


# ---------------------------------------------------------

"""
    This is a FastAPI endpoint that takes in a POST request with a JSON payload containing a "text" field. 
    The text field is passed to a KeywordExtractor object, which extracts keywords from the text. 
    The extracted keywords are then returned as a JSON response. 
    @param text - A request body containing the text to process.
"""


@router.post("/find", status_code=status.HTTP_200_OK, description="Find keywords in text", response_description="Keywords found in text")
async def find_keywords(text: Text) -> ListKeywordsFound:
    extractor = KeywordExtractor(text.text_body)
    return extractor.extract_keywords()
