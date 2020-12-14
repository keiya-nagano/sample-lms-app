import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  isRegister: boolean;

  titleControl: FormControl;
  authorControl: FormControl;
  noteControl: FormControl;

  bookId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.isRegister = false;
    this.titleControl = new FormControl();
    this.authorControl = new FormControl();
    this.noteControl = new FormControl();
    this.titleControl.setValidators([Validators.required]);
    this.authorControl.setValidators([Validators.required]);
    this.noteControl.setValidators([Validators.maxLength(200)]);
    this.bookId = undefined;

    const param = this.route.snapshot.paramMap.get('bookId');
    if (param === 'new') {
      this.isRegister = true;
    } else {
      this.bookId = Number(param);
      this.loadingService.start('book:load');
      this.bookService.fetchBook(this.bookId).subscribe(book => {
        this.loadingService.end('book:load');
        this.titleControl.setValue(book.title);
        this.authorControl.setValue(book.author);
        this.noteControl.setValue(book.note);
      });
    }
  }

  actionByButton(): void {
    if (this.isRegister) {
      this.register();
    } else {
      this.update();
    }
  }

  register(): void {
    this.loadingService.start('book:register');
    const newTitle = this.titleControl.value;
    const newAuthor = this.authorControl.value;
    const newNote = this.noteControl.value;
    this.bookService.createBook(newTitle, newAuthor, newNote).subscribe(bookList => {
      this.loadingService.end('book:register');
      this.bookService.bookList = bookList;
      this.back();
    });
  }

  update(): void {
    this.loadingService.start('book:update');
    const newTitle = this.titleControl.value;
    const newAuthor = this.authorControl.value;
    const newNote = this.noteControl.value;
    this.bookService.updateBook(this.bookId, newTitle, newAuthor, newNote).subscribe(bookList => {
      this.loadingService.end('book:update');
      this.bookService.bookList = bookList;
      this.back();
    });
  }

  back(): void {
    this.router.navigateByUrl('books');
  }

}
