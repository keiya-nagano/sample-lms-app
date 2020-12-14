from fastapi import Depends
from database import SessionContextFactory
from book import Book
from book_model import BookModel


class BookService:
    def __init__(self, session_factory: SessionContextFactory = Depends()):
        self.Session = session_factory.get_db

    def read_books(self):
        with self.Session() as db_session:
            book_list = db_session.query(Book).all()
        return list(map(BookModel.from_orm, book_list))

    def read_book(self, id: int):
        with self.Session() as db_session:
            book = db_session.query(Book).filter(Book.id == id).first()
            if book is None:
                raise NoBookException(id)
        return book

    def create_book(self, title: str, author: str, note: str):
        with self.Session() as db_session:
            latest_book = db_session.query(Book).order_by(Book.id.desc()).first()
            new_book_id = latest_book.id + 1
            new_book = Book(new_book_id, title, author, note)
            db_session.add(new_book)
            db_session.commit()
            book_list = db_session.query(Book).all()
        return list(map(BookModel.from_orm, book_list))

    def update_book(self, id: int, title: str, author: str, note: str):
        with self.Session() as db_session:
            book = db_session.query(Book).filter(Book.id == id).first()
            if book is None:
                raise NoBookException(id)
            book.title = title
            book.author = author
            book.note = note
            db_session.commit()
            book_list = db_session.query(Book).all()
        return list(map(BookModel.from_orm, book_list))

    def delete_book(self, id: int):
        with self.Session() as db_session:
            book = db_session.query(Book).filter(Book.id == id).first()
            if book is None:
                raise NoBookException(id)
            db_session.delete(book)
            db_session.commit()
            book_list = db_session.query(Book).all()
        return list(map(BookModel.from_orm, book_list))


class NoBookException(Exception):
    id: int

    def __init__(self, id):
        super().__init__("Not Found: Book_ID=%d" % id)
        self.id = id
