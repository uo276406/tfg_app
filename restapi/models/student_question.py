from sqlalchemy import Column, ForeignKey, Table, String, Integer
from .base import Base


student_question = Table('student_question', Base.metadata,
    Column('student_id', String, ForeignKey('student.id'), primary_key=True),
    Column('question_id', String, ForeignKey('question.id'), primary_key=True),
    Column('answer', Integer, nullable=False),
)