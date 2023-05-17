from fastapi import APIRouter
from users.usersmanager import UserRead, UserUpdate, fastapi_users


router = APIRouter()

# Gestión de usuarios ---------------------------------------

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate)
)

# -----------------------------------------------------------