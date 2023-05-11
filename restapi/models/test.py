
from sqlalchemy import String, DateTime, ForeignKey, Boolean, Column
from sqlalchemy.orm import relationship
from .base import Base
from .test_student import test_student


class Test(Base):
    __tablename__ = 'test'

    id = Column(String(30), primary_key=True)
    user_id = Column(String(30), ForeignKey('user.id'))
    question_id = Column(String(30), ForeignKey('question.id'))
    created_at = Column(DateTime, nullable=False)
    status = Column(Boolean, nullable=False)
    students = relationship("Student", secondary=test_student, back_populates="tests")




