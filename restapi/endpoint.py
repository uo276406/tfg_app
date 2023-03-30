from fastapi import FastAPI
from pydantic import BaseModel
from keywordalgorithm.keywordextractor import KeywordExtractor

app = FastAPI(title="KeywordExtractorAPI", version="v1.0")


# Modelos de datos ----------------------------------------

class Text(BaseModel):
    text_body: str


# -------------------------------------------------------------------------------------------------------------------


@app.get("/api/v1.0/")
async def root():
    return {"message": "This is an API REST to found keywords in a text"}


@app.post("/api/v1.0/keywords")
async def find_keywords(text: Text):
    extractor = KeywordExtractor()
    return extractor.extract_keywords(text.text_body)
