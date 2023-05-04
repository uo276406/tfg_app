
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select
from models.student import Student


DATABASE = "sqlite+aiosqlite:///development.db"

engine = create_async_engine(DATABASE)

async def insert_student(student):
    async with AsyncSession(engine) as session:
        session.add(Student(id=student["id"], mark=student["mark"], test_id=student["test_id"]))
        await session.commit()

async def get_student_by_id_and_test(student_id, test_id):
    async with AsyncSession(engine) as session:
        print(select(Student).where(Student.id == str(student_id)).where(Student.test_id == str(test_id)))
        result = await session.execute(select(Student).where(Student.id == str(student_id)).where(Student.test_id == str(test_id)))
        return result.scalars().first()

