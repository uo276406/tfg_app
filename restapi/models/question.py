
from sqlalchemy import Table, Column, String, MetaData, CHAR
from sqlalchemy.orm import registry

metadata = MetaData()

question_table = Table('question', metadata,
    Column('id', CHAR(36), primary_key=True),
    Column('question_text', String, nullable=False),
    Column('test_id', CHAR(36), nullable=False, primary_key=True),
)

class Question:
    def __init__(self, id: str, question_text: str, test_id: str):
        self.id = id
        self.question_text = question_text
        self.test_id = test_id

registry().map_imperatively(Question, question_table)


