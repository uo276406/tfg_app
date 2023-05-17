from sqlalchemy import select
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


async def update_test_student(test_id, student_id, score, finished):
    async with AsyncSession(engine) as session:
        async with session.begin():
            update_test_student = TestStudent.update().where((TestStudent.c.test_id == test_id) & (TestStudent.c.student_id == student_id)).values(
                score=score, finished=finished)
        await session.execute(update_test_student)
        await session.commit()


async def get_student_by_id_and_test(student_id, test_id):
    async with AsyncSession(engine) as session:
        query = select(TestStudent.c).where(
            (TestStudent.c.student_id == student_id) &
            (TestStudent.c.test_id == test_id)
        )
        result = await session.execute(query)
        return result.fetchone()
    
async def get_students_by_test(test_id):
    async with AsyncSession(engine) as session:
        query = select(TestStudent).where(
            (TestStudent.c.test_id == test_id)
        )
        result = await session.execute(query)
        return result