from sqlalchemy import String, Column
from sqlalchemy.orm import relationship
from .base import Base
from .studentquestion import StudentQuestion
from .teststudent import TestStudent

class Student(Base):
     __tablename__ = 'Student'

     id = Column(String(30), primary_key=True)
     tests = relationship("Test", secondary=TestStudent, back_populates="students")
     questions = relationship("Question", secondary=StudentQuestion, back_populates="students")





