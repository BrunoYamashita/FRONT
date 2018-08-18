import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'st-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  id: string;
  book: Book;
  bookForm: FormGroup;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      yearPublished: ['', [Validators.required, Validators.min(1500), Validators.max(2018)]],
      price: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    });
    this.route.params.subscribe((params) => {
      this.id = params['id'] || null;
    });
    this.bookService.getBooksById(this.id).subscribe((book) => {
      this.book = book;
      this.bookForm.setValue(this.book);
    });
  }


  onSubmit() {
    this.id
    ? this.bookService.updateBook(this.bookForm.value, this.id).subscribe(res => {
      this.router.navigateByUrl('/book');
    })
    : this.bookService.addBook(this.bookForm.value).subscribe(res => {
      this.router.navigateByUrl('/book');
    });
  }
}
