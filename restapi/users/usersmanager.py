import uuid
from typing import Optional
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin, schemas
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from repository.usersrepository import User, get_user_db
import os

# Esquemas de usuarios --------------------------------------------


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


SECRET = os.getenv("SECRET")
SECONDS = os.getenv("SECONDS")

class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(
            f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="/api/v1.0/auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=SECONDS)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
