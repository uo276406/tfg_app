from fastapi import APIRouter
from users.usersmanager import auth_backend, fastapi_users
from users.usersmanager import UserCreate, UserRead, fastapi_users


router = APIRouter()

# Gestión de usuarios ---------------------------------------
router.include_router(
    fastapi_users.get_auth_router(auth_backend)
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
)
router.include_router(
    fastapi_users.get_reset_password_router(),
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
)
