from sqlalchemy import String, Column
from sqlalchemy.orm import relationship
from .base import Base
from .student_question import student_question
from .test_student import test_student

class Student(Base):
     __tablename__ = 'student'

     id= Column(String(30), primary_key=True)
     tests = relationship("Test", secondary=test_student, back_populates="students")
     questions = relationship("Question", secondary=student_question, back_populates="students")





