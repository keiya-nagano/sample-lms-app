from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from fastapi import Depends
from contextlib import contextmanager
from settings import Settings


settings = Settings()
db_engine = create_engine(settings.dbfile_path)


def get_session():
    return sessionmaker(bind=db_engine)


class SessionContextFactory:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    @contextmanager
    def get_db(self):
        db = self.session()
        try:
            yield db
        finally:
            db.close()
