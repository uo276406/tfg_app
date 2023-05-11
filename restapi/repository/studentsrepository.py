
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select
from models.student import Student
from models.test import Test
from models.teststudent import TestStudent
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE = os.getenv("DATABASE")

engine = create_async_engine(DATABASE)

async def insert_student(student_id, test_id):
    async with AsyncSession(engine) as session:
        student_to_add = Student(id=student_id)
        session.add(student_to_add)
        new_test_student = TestStudent.insert().values(test_id=test_id, student_id=student_id, score=0, finished=False)
        await session.execute(new_test_student)
        await session.commit()

async def find_student_by_id(student_id):
    async with AsyncSession(engine) as session:
        query = select(Student).where(Student.id == student_id)
        result = await session.execute(query)
        return result.scalars().first()

async def get_student_by_id_and_test(student_id, test_id):
    async with AsyncSession(engine) as session:
        query = select(TestStudent).where(
            (TestStudent.c.student_id == student_id) &
            (TestStudent.c.test_id == test_id)
        )
        result = await session.execute(query)
        return result.scalars().first()


async def get_students_by_test(test_id):
    async with AsyncSession(engine) as session:
        query = select(TestStudent).where(
            (TestStudent.c.test_id == test_id)
        )
        result = await session.execute(query)
        return result
