import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorHandler {
  static handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
