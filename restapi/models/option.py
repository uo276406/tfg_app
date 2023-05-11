
from sqlalchemy import String, Boolean, ForeignKey, Column
from .base import Base

class Option(Base):
    __tablename__ = 'Option'

    id = Column(String(30), primary_key=True)
    value = Column(String(100), nullable=False)
    is_correct = Column(Boolean, nullable=False)
    question_id = Column(String(30), ForeignKey('Question.id'), primary_key=True)



