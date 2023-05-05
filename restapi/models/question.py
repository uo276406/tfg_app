
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base


class Question(Base):
    __tablename__ = 'question'

    id: Mapped[str] = mapped_column(String(30), primary_key=True)
    question_text: Mapped[str] = mapped_column(String(100), nullable=False)
    test_id: Mapped[str] = mapped_column(String(30), ForeignKey('user.id'), primary_key=True)



