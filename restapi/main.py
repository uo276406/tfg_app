from fastapi import Depends, FastAPI
from routers import keywordsrouter, questionsgeneratorrouter, usersrouter, authrouter, testrouter, studentsrouter, studentquestionsrouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine
from models.base import Base
import os


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
app.include_router(studentsrouter.router, prefix=version +
                   "/students", tags=["students"])
app.include_router(studentquestionsrouter.router, prefix=version +
                     "/studentquestions", tags=["studentquestions"])


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

# Base de datos -------------------------------------------


@app.on_event("startup")
async def startup():
    load_dotenv()
    DATABASE = os.getenv("DATABASE")
    engine = create_async_engine(DATABASE)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/api/v1.0/")
async def root():
    return {"detail": "This is an API REST to found keywords in a text"}
