from sqlalchemy import Column, ForeignKey, Table, String, Integer, Boolean
from .base import Base


test_student = Table('test_student', Base.metadata,
    Column('test_id', String, ForeignKey('test.id'), primary_key=True),
    Column('student_id', String, ForeignKey('student.id'), primary_key=True),
    Column('score', Integer, nullable=False),
    Column('max_score', Integer, nullable=False),
    Column('finished', Boolean, nullable=False),
)