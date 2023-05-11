
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select
from dotenv import load_dotenv
import os
from models.studentquestion import StudentQuestion

load_dotenv()
DATABASE = os.getenv("DATABASE")

engine = create_async_engine(DATABASE)


async def insert_student_question(student_id, question_id, answer):
    async with AsyncSession(engine) as session:
        async with session.begin():
            new_student_question = StudentQuestion.insert().values(
                student_id=student_id, question_id=question_id, answer=answer)
            await session.execute(new_student_question)
            await session.commit()


async def update_student_question(student_id, question_id, option):
    async with AsyncSession(engine) as session:
        async with session.begin():
            new_student_question = StudentQuestion.update().where(
                (StudentQuestion.c.student_id == student_id) & (StudentQuestion.c.question_id == question_id)).values(answer=option)
            await session.execute(new_student_question)
            await session.commit()


async def get_student_questions_by_ids(student_id, question_id):
    async with AsyncSession(engine) as session:
        query = select(StudentQuestion).where(
            (StudentQuestion.c.student_id == student_id) &
            (StudentQuestion.c.question_id == question_id)
        )
        result = await session.execute(query)
        return result.scalars().first()
