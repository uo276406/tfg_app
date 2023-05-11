
from sqlalchemy import String, DateTime, ForeignKey, Boolean, Column
from sqlalchemy.orm import relationship
from .base import Base
from .teststudent import TestStudent


class Test(Base):
    __tablename__ = 'Test'

    id = Column(String(30), primary_key=True)
    user_id = Column(String(30), ForeignKey('User.id'))
    question_id = Column(String(30), ForeignKey('Question.id'))
    created_at = Column(DateTime, nullable=False)
    status = Column(Boolean, nullable=False)
    students = relationship("Student", secondary=TestStudent, back_populates="tests")




