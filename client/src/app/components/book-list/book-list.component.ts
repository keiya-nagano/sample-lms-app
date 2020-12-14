import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from 'src/app/entities/book';
import { BookService } from 'src/app/services/book.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  displayedColumns = ['id', 'title', 'author', 'note', 'operation'];
  dataSource: MatTableDataSource<Book>;

  errorMessage: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.errorMessage = '';

    if (this.bookService.bookList && this.bookService.bookList.length > 0) {
      this.dataSource = new MatTableDataSource(this.bookService.bookList);
      this.dataSource.sort = this.sort;
    } else {
      this.loadingService.start('books:load');
      this.bookService.fetchBooks().subscribe(bookList => {
        this.loadingService.end('books:load');
        this.bookService.bookList = bookList;
        this.dataSource = new MatTableDataSource(bookList);
        this.dataSource.sort = this.sort;
        if (bookList.length === 0) {
          this.errorMessage = 'No Books. Please register.';
        }
      });
    }
  }

  register(): void {
    this.router.navigateByUrl('books/new');
  }

  showDetail(id: number): void {
    this.router.navigateByUrl('books/' + String(id));
  }

  delete(id: number): void {
    const result = confirm('Are you sure you want to delete it?\nBook ID=' + String(id));
    if (result) {
      this.loadingService.start('book:delete');
      this.bookService.deleteBook(id).subscribe(bookList => {
        this.loadingService.end('book:delete');
        this.bookService.bookList = bookList;
        this.dataSource.data = bookList;
      });
    }
  }

}
