
from sqlalchemy import Table, Column, CHAR, MetaData, REAL
from sqlalchemy.orm import registry

metadata = MetaData()

student_table = Table('student', metadata,
    Column('id', CHAR(36), primary_key=True),
    Column('mark', REAL, nullable=False),
    Column('test_id', CHAR(36), primary_key=True),
)

class Student:
    def __init__(self, id: str, mark:REAL, test_id: str):
        self.id = id
        self.mark = mark
        self.test_id = test_id

registry().map_imperatively(Student, student_table)


