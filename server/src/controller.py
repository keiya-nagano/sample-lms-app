from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from settings import Settings
from logic import BookService, NoBookException
from pydantic import BaseModel


settings = Settings()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=settings.cors_allow_credentials,
    allow_methods=settings.cors_allow_methods,
    allow_headers=settings.cors_allow_headers
)


class RequestBody(BaseModel):
    title: str = None
    author: str = None
    note: str = None


@app.get("/api/books")
def read_books(service: BookService = Depends()):
    return service.read_books()


@app.get("/api/books/{id}")
def read_book(id: str, service: BookService = Depends()):
    try:
        book = service.read_book(int(id))
    except NoBookException as e:
        raise HTTPException(status_code=400, detail=str(e))
    return book


@app.post("/api/books")
def create_book(body: RequestBody, service: BookService = Depends()):
    new_book_list = service.create_book(body.title, body.author, body.note)
    return new_book_list


@app.put("/api/books/{id}")
def update_book(id: str, body: RequestBody, service: BookService = Depends()):
    try:
        new_book_list = service.update_book(id, body.title, body.author, body.note)
    except NoBookException as e:
        raise HTTPException(status_code=400, detail=str(e))
    return new_book_list


@app.delete("/api/books/{id}")
def delete_book(id: str, service: BookService = Depends()):
    try:
        new_book_list = service.delete_book(id)
    except NoBookException as e:
        raise HTTPException(status_code=400, detail=str(e))
    return new_book_list
