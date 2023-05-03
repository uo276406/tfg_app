from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from models.answer import Answer


DATABASE = "sqlite+aiosqlite:///development.db"

engine = create_async_engine(DATABASE)


async def insert_answer(answer):
    async with AsyncSession(engine) as session:
        session.add(Answer(answer["id"], answer["value"], answer["is_correct"], answer["question_id"]))
        await session.commit()



