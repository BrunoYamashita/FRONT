import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from './book.model';
import { ErrorHandler } from 'src/app/common/handlers/error-handler';


@Injectable({providedIn: 'root'})
export class BookService {

  private booksUrl = `${environment.api}/book`;  // URL to web api

  constructor(
    private http: HttpClient) { }



  /** GET books from the server */
  getBooks (name?: string, type?: string): Observable<Book[]> {
    const params = new HttpParams();
    params.set('name', name || '');
    params.set('type', type || '');
    return this.http.get<Book[]>(this.booksUrl, {params})
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  getBooksById (id: string): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  addBook (book: Book): Observable<Book[]> {
    return this.http.post<Book[]>(this.booksUrl, book)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  updateBook (book: Book, id: string): Observable<Book> {
    return this.http.put<Book>(`${this.booksUrl}/${id}`, book)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

  deleteBook (id: string): Observable<Book[]> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Book[]>(this.booksUrl)
    .pipe(
      catchError(ErrorHandler.handleError)
    );
  }

}
