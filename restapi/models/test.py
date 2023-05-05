
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base


class Test(Base):
    __tablename__ = 'test'

    id: Mapped[str] = mapped_column(String(30), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(30), ForeignKey('user.id'))
    created_at: Mapped[DateTime] = mapped_column(DateTime, nullable=False)


