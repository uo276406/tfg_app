
from sqlalchemy import String, Boolean, ForeignKey, Column
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

class Answer(Base):
    __tablename__ = 'answer'

    id = Column(String(30), primary_key=True)
    value = Column(String(100), nullable=False)
    is_correct = Column(Boolean, nullable=False)
    question_id = Column(String(30), ForeignKey('question.id'), primary_key=True)



