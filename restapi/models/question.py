from pydantic import BaseModel

# Modelos de datos: Request ----------------------------------------


class Keyword(BaseModel):
    value: str
    numberOfQuestions: int


class TextKeywords(BaseModel):
    text_body: str
    keywords_selected: list[Keyword]


# Modelos de datos: Response ----------------------------------------


class Answer(BaseModel):
    value: str
    correct: bool


class Question(BaseModel):
    question: str
    options: list[Answer]


class QuestionsInfo(BaseModel):
    questions: list[Question]
    not_enough_questions_for: list[str]
    there_are_repeated: bool

# ---------------------------------------------------------