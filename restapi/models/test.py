
from sqlalchemy import Table, Column, CHAR, MetaData, DateTime
from sqlalchemy.orm import registry
import datetime

metadata = MetaData()

test_table = Table('test', metadata,
    Column('id', CHAR(36), primary_key=True),
    Column('user_id', CHAR(36), nullable=False),
    Column('created_at', DateTime, nullable=False),
)

class Test:
    def __init__(self, id: str, user_id: str):
        self.id = id
        self.user_id = user_id
        self.created_at = datetime.datetime.now()

registry().map_imperatively(Test, test_table)


