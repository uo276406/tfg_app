from sqlalchemy import Column, ForeignKey, Table, String, REAL, Boolean
from .base import Base


TestStudent = Table('TestStudent', Base.metadata,
    Column('test_id', String, ForeignKey('Test.id'), primary_key=True),
    Column('student_id', String, ForeignKey('Student.id'), primary_key=True),
    Column('score', REAL, nullable=False),
    Column('finished', Boolean, nullable=False),
)