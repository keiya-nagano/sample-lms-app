from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Book(Base):
    __tablename__ = 'book'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    author = Column(String)
    note = Column(String, nullable=True)

    def __init__(self, id, title, author, note):
        self.id = id
        self.title = title
        self.author = author
        self.note = note
    
    def __repr__(self):
        return "<Book(id='%s', title='%s, author='%s', note='%s')>" \
            % (self.id, self.title, self.author, self.note)