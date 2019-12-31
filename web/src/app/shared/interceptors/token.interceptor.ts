import { AuthService } from './../../auth/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public usuarioService: AuthService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token');

    if ( token ) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(request).pipe(
      catchError(
        err => {
          if (err.status === 401) {
            this.usuarioService.logout();
          }
          const error = err; // err.error.message || err.statusText;
          return throwError(error);
        }
      )
    );
  }
}
