from fastapi import APIRouter, status, Depends
from keywordalgorithm.keywordextractor import KeywordExtractor
from users.usersmanager import fastapi_users
from pydantic import BaseModel

router = APIRouter()

# Modelos de datos: Request ----------------------------------------

class Text(BaseModel):
    text_body: str


# This is a FastAPI dependency that checks if the user is authenticated.
current_active_user = fastapi_users.current_user(active=True)

"""
    This is a FastAPI endpoint that takes in a POST request with a JSON payload containing a "text" field. 
    The text field is passed to a KeywordExtractor object, which extracts keywords from the text. 
    The extracted keywords are then returned as a JSON response. 
    @param text - A request body containing the text to process.
"""


@router.post("/find", status_code=status.HTTP_200_OK, description="Find keywords in text", response_description="Keywords found in text"  ,dependencies=[Depends(current_active_user)])
async def find_keywords(text: Text):
    extractor = KeywordExtractor(text.text_body)
    keywords_found = extractor.extract_keywords()
    return {'keywords': keywords_found}
