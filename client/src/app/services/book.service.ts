import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from 'src/app/entities/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  bookList: Book[];

  fetchBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.server + '/api/books');
  }

  fetchBook(id: number): Observable<Book> {
    return this.http.get<Book>(environment.server + '/api/books/' + String(id));
  }

  createBook(newTitle: string, newAuthor: string, newNote: string): Observable<Book[]> {
    const body = {
      title: newTitle,
      author: newAuthor,
      note: newNote
    };
    return this.http.post<Book[]>(environment.server + '/api/books', body);
  }

  updateBook(id: number, newTitle: string, newAuthor: string, newNote: string): Observable<Book[]> {
    const body = {
      title: newTitle,
      author: newAuthor,
      note: newNote
    };
    return this.http.put<Book[]>(environment.server + '/api/books/' + String(id), body);
  }

  deleteBook(id: number): Observable<Book[]> {
    return this.http.delete<Book[]>(environment.server + '/api/books/' + String(id));
  }
}
