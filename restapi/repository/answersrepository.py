from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from models.answer import Answer
from sqlalchemy import select


DATABASE = "sqlite+aiosqlite:///development.db"

engine = create_async_engine(DATABASE)


async def insert_answer(answer):
    async with AsyncSession(engine) as session:
        session.add(Answer(answer["id"], answer["value"], answer["is_correct"], answer["question_id"]))
        await session.commit()

async def get_answers_by_question(question_id):
    async with AsyncSession(engine) as session:
        result = await session.execute(select(Answer).filter(Answer.question_id == str(question_id)))
        return result.scalars().all()

