import uuid
from fastapi_users import schemas
from typing import Optional
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Column, String
from .base import Base

# Esquemas de usuarios --------------------------------------------
# Modelos --------------------------------------------------

class User(SQLAlchemyBaseUserTableUUID, Base):
    __tablename__ = "User"
    name = Column(String, nullable=False)
    surname1 = Column(String, nullable=False)
    surname2 = Column(String)
# ----------------------------------------------------------

class UserRead(schemas.BaseUser[uuid.UUID]):
    name: str
    surname1: str
    surname2: str


class UserCreate(schemas.BaseUserCreate):
    name: str
    surname1: str
    surname2: Optional[str]


class UserUpdate(schemas.BaseUserUpdate):
    name: Optional[str]
    surname1: Optional[str]
    surname2: Optional[str]
# ------------------------------------------------------------------