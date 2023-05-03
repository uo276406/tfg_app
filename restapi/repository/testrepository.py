
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select, bindparam
from models.test import Test


DATABASE = "sqlite+aiosqlite:///development.db"

engine = create_async_engine(DATABASE)


async def insert_test(test):
    async with AsyncSession(engine) as session:
        session.add(Test(id=test["id"], user_id=test["user_id"]))
        await session.commit()

async def get_tests_by_user(user_id):
    async with AsyncSession(engine) as session:
        stmt = select(Test).where(Test.user_id == str(user_id))
        result = await session.execute(statement=stmt)
        return result.scalars().all()

