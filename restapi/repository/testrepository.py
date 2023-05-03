
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from models.test import Test


DATABASE = "sqlite+aiosqlite:///development.db"

engine = create_async_engine(DATABASE)


async def insert_test(test):
    async with AsyncSession(engine) as session:
        session.add(Test(id=test["id"], user_id=test["user_id"]))
        await session.commit()



