from pydantic import BaseModel

# Modelos de datos: Request ----------------------------------------

class Text(BaseModel):
    text_body: str


# Modelos de datos: Response ----------------------------------------


class KeywordFound(BaseModel):
    index: int
    value: str


class ListKeywordsFound(BaseModel):
    keywords: list[KeywordFound]