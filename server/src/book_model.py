from pydantic import BaseModel
from book import Book


class BookModel(BaseModel):
    id: int
    title: str
    author: str
    note: str = None

    class Config:
        orm_mode = True
    
    @classmethod
    def from_orm(cls, orm: Book):
        return cls(id=orm.id, title=orm.title, author=orm.author, note=orm.note)