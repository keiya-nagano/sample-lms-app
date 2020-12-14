from typing import Set
from pydantic import BaseSettings


class Settings(BaseSettings):
    cors_allow_origins: Set[str] = [
        "http://localhost:80",
        "http://localhost:4200"
    ]
    cors_allow_credentials: bool = True
    cors_allow_methods: Set[str] = ["*"]
    cors_allow_headers: Set[str] = ["*"]
    dbfile_path: str = "sqlite:///DB/sample.sqlite3"
