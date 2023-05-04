from fastapi import Depends, FastAPI
from routers import keywordsrouter, questionsgeneratorrouter, usersrouter, authrouter, testrouter, studentsrouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path('../.env.development')
load_dotenv(dotenv_path=dotenv_path)

app = FastAPI(
    title="Keyword APP API",
    description="API REST to found keywords in a text and generate questions about it",
    version="v1.0",
    contact={
        "name": "Diego González Suárez",
        "email": "uo276406@uniovi.es",
    }
)
version = "/api/v1.0"

# Adición de routers ----------------------------------------
app.include_router(keywordsrouter.router, prefix=version + "/keywords",
                   tags=["keywords"])
app.include_router(questionsgeneratorrouter.router, prefix=version + "/questions",
                   tags=["questions"])
app.include_router(usersrouter.router, prefix=version + "/users",
                   tags=["users"])
app.include_router(authrouter.router, prefix=version + "/auth",
                   tags=["auth"])
app.include_router(testrouter.router, prefix=version + "/test",
                   tags=["test"])
app.include_router(studentsrouter.router, prefix=version + "/students", tags=["students"])


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
