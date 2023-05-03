
from sqlalchemy import Table, Column, String, MetaData, CHAR
from sqlalchemy.orm import registry

metadata = MetaData()

answer_table = Table('answer', metadata,
    Column('id', CHAR(36), primary_key=True),
    Column('value', String, nullable=False),
    Column('is_correct', CHAR(36), nullable=False),
    Column('question_id', CHAR(36), nullable=False, primary_key=True),
)

class Answer:
    def __init__(self, id: str, value: str, is_correct: bool, question_id: str):
        self.id = id
        self.value = value
        self.is_correct = is_correct
        self.question_id = question_id

registry().map_imperatively(Answer, answer_table)


