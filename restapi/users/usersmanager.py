import uuid
from models.user import UserCreate, UserUpdate, UserRead
from typing import Optional
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin, InvalidPasswordException
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from repository.usersrepository import User, get_user_db
from dotenv import load_dotenv
import os

load_dotenv()

SECRET = os.getenv("SECRET")
SECONDS = int(os.getenv("SECONDS"))
MIN_PASSWORD_LENGTH = 6

class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def validate_password(
        self,
        password: str,
        user: Optional[User] = None,
    ) -> None:
        if len(password) < MIN_PASSWORD_LENGTH:
            raise InvalidPasswordException(
                reason="Password should be at least 6 characters"
            )
        if " " in password:
            raise InvalidPasswordException(
                reason="Password should not contain blankspaces"
            )
        if not any(char.isdigit() for char in password):
            raise InvalidPasswordException(
                reason="Password should contain at least one digit"
            )
        if not any(char.lower().isalpha() for char in password):
            raise InvalidPasswordException(
                reason="Password should contain at least one downcase letter"
            )
        if not any(char.isupper() for char in password):
            raise InvalidPasswordException(
                reason="Password should contain at least one uppercase letter"
            )
        

    async def on_after_register(self, user: User, token:str, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")
        print(token)

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


bearer_transport = BearerTransport(tokenUrl="/api/v1.0/auth/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=SECONDS)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
