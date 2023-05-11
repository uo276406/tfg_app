
from sqlalchemy import String, Column
from sqlalchemy.orm import relationship
from .base import Base
from .student_question import student_question


class Question(Base):
    __tablename__ = 'question'

    id = Column(String(30), primary_key=True)
    question_text = Column(String(100), nullable=False)
    students = relationship("Student", secondary=student_question, back_populates="questions")



