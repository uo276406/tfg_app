from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from dotenv import load_dotenv
import os
from models.teststudent import TestStudent

load_dotenv()
DATABASE = os.getenv("DATABASE")

engine = create_async_engine(DATABASE)


async def insert_test_student(student_id, test_id):
    async with AsyncSession(engine) as session:
        async with session.begin():
            new_test_student = TestStudent.insert().values(
                test_id=test_id, student_id=student_id, score=0, finished=False)
        await session.execute(new_test_student)
        await session.commit()