
from sqlalchemy import String, REAL, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

class Student(Base):
     __tablename__ = 'student'

     id: Mapped[str] = mapped_column(String(30), primary_key=True)
     mark: Mapped[float] = mapped_column(REAL, nullable=False)
     test_id: Mapped[str] = mapped_column(String(30), ForeignKey('test.id'), primary_key=True)




