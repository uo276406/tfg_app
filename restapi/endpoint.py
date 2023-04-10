from fastapi import FastAPI
from pydantic import BaseModel
from keywordalgorithm.keywordextractor import KeywordExtractor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="KeywordExtractorAPI", version="v1.0")

# Ajustes de CORS -----------------------------------------
# Se permiten todos los orígenes
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de datos ----------------------------------------


class Text(BaseModel):
    text_body: str


class KeywordsSelected(BaseModel):
    keywords_selected: list


# -------------------------------------------------------------------------------------------------------------------


@app.get("/api/v1.0/")
async def root():
    return {"message": "This is an API REST to found keywords in a text"}


@app.post("/api/v1.0/keywords")
async def find_keywords(text: Text):
    extractor = KeywordExtractor()
    return extractor.extract_keywords(text.text_body)


@app.post("/api/v1.0/questions")
async def generate_questions(text: Text, keywords: KeywordsSelected):
    return {'questions': [
        {'enunciado1': ['a', 'b', 'b']},
        {'enunciado2': ['a', 'b', 'b']}
    ]}

@app.get("/api/v1.0/questions")
async def generate_questions():
    return {'questions': [
        {'enunciado1': ['a', 'b', 'b']},
        {'enunciado2': ['a', 'b', 'b']}
    ]}
