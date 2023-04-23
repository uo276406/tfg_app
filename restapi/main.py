from fastapi import Depends, FastAPI
from routers import keywordsrouter, questionsrouter
from fastapi.middleware.cors import CORSMiddleware
from repository.usersrepository import User, create_db_and_tables
from users.usersmanager import UserCreate, UserRead, UserUpdate, auth_backend, current_active_user, fastapi_users


app = FastAPI(title="KeywordExtractorAPI", version="v1.0")

# Adición de routers ----------------------------------------
app.include_router(keywordsrouter.router, prefix="/api/v1.0/keywords",
                   tags=["keywords"])
app.include_router(questionsrouter.router, prefix="/api/v1.0/questions",
                   tags=["questions"])
app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)

# Gestión de usuarios ---------------------------------------
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
@app.on_event("startup")
async def on_startup():
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}

# -----------------------------------------------------------

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
