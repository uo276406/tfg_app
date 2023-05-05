
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select
from models.test import Test
from dotenv import load_dotenv
from datetime import datetime
import os

load_dotenv()
DATABASE = os.getenv("DATABASE")

engine = create_async_engine(DATABASE)


async def insert_test(test):
    async with AsyncSession(engine) as session:
        session.add(Test(id=test["id"], user_id=test["user_id"], created_at=datetime.now()))
        await session.commit()

async def get_tests_by_user(user_id):
    async with AsyncSession(engine) as session:
        result = await session.execute(select(Test).where(Test.user_id == str(user_id)))
        return result.scalars().all()
    
async def get_test_by_id(test_id):
    async with AsyncSession(engine) as session:
        result = await session.execute(select(Test).where(Test.id == str(test_id)))
        return result.scalars().first()


