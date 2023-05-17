from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from models.option import Option
from sqlalchemy import select
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE = os.getenv("DATABASE")

engine = create_async_engine(DATABASE)


async def insert_option(option):
    async with AsyncSession(engine) as session:
        session.add(Option(id=option["id"], value=option["value"], is_correct=option["is_correct"], question_id=option["question_id"]))
        await session.commit()

async def get_options_by_question(question_id):
    async with AsyncSession(engine) as session:
        result = await session.execute(select(Option).filter(Option.question_id == str(question_id)))
        return result.scalars().all()

