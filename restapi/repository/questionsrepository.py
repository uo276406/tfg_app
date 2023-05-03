from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from models.question import Question


DATABASE = "sqlite+aiosqlite:///development.db"

engine = create_async_engine(DATABASE)


async def insert_question(question):
    async with AsyncSession(engine) as session:
        session.add(Question(id=question["id"], question_text=question["question_text"], test_id=question["test_id"]))
        await session.commit()



