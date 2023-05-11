
from sqlalchemy import String, Column, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base
from .studentquestion import StudentQuestion


class Question(Base):
    __tablename__ = 'Question'

    id = Column(String(30), primary_key=True)
    question_text = Column(String(100), nullable=False)
    test_id = Column(String(30), ForeignKey('Test.id'))
    students = relationship("Student", secondary=StudentQuestion, back_populates="questions")



