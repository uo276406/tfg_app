
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select
from models.student import Student
from models.teststudent import TestStudent
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE = os.getenv("DATABASE")

engine = create_async_engine(DATABASE)

async def insert_student(student_id):
    async with AsyncSession(engine) as session:
        student_to_add = Student(id=student_id)
        session.add(student_to_add)
        await session.commit()

async def find_student_by_id(student_id):
    async with AsyncSession(engine) as session:
        query = select(Student).where(Student.id == student_id)
        result = await session.execute(query)
        return result.scalars().first()
