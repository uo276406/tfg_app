from sqlalchemy import Column, ForeignKey, String, Integer, Table, REAL, Boolean
from .base import Base

StudentQuestion = Table('StudentQuestion', Base.metadata,
    Column('question_id', String, ForeignKey('Question.id'), primary_key=True),
    Column('student_id', String, ForeignKey('Student.id'), primary_key=True),
    Column('answer', Integer, nullable=False),
)

