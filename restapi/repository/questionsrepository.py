from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from models.question import Question
from sqlalchemy import select
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE = os.getenv("DATABASE")

engine = create_async_engine(DATABASE)


async def insert_question(question):
    async with AsyncSession(engine) as session:
        session.add(Question(id=question["id"], question_text=question["question_text"], test_id=question["test_id"]))
        await session.commit()

async def get_questions_by_test(test_id):
    async with AsyncSession(engine) as session:
        result = await session.execute(select(Question).filter(Question.test_id == str(test_id)))
        return result.scalars().all()

