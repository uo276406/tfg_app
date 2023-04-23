from fastapi import APIRouter
from repository.usersrepository import create_db_and_tables
from users.usersmanager import UserRead, UserUpdate, fastapi_users


router = APIRouter()

# Gestión de usuarios ---------------------------------------

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate)
)

@router.on_event("startup")
async def on_startup():
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()

# -----------------------------------------------------------