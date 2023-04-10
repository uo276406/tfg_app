from fastapi import FastAPI
from pydantic import BaseModel
from routers import keywords, questions
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="KeywordExtractorAPI", version="v1.0")

# Adición de routers ----------------------------------------
app.include_router(keywords.router, prefix="/api/v1.0/keywords",
                   tags=["keywords"])
app.include_router(questions.router, prefix="/api/v1.0/questions",
                   tags=["questions"])

# Ajustes de CORS -----------------------------------------
# Se permiten todos los orígenes
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------------------------------------------------------------


@app.get("/api/v1.0/")
async def root():
    return {"message": "This is an API REST to found keywords in a text"}
