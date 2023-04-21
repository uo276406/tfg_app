from fastapi import APIRouter, status
from pydantic import BaseModel
from keywordalgorithm.keywordextractor import KeywordExtractor

router = APIRouter()

# Modelos de datos: Request ----------------------------------------


class UserLogin(BaseModel):
    email: str
    password: str


# Modelos de datos: Response ----------------------------------------


class LoginResponse(BaseModel):
    response: bool


# ---------------------------------------------------------

@router.post("/login", status_code=status.HTTP_200_OK, description="Inicio de sesión de usuarios", response_description="Responde con la sesión del usuario")
async def login(userLogin: UserLogin) -> LoginResponse:
    print(userLogin.email)
    print(userLogin.password)
    return LoginResponse(response=True)

