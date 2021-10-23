import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public toastService: ToastService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(
        err => {
            console.log('ErrorInterceptor', err);
            if (err.status === 0) {
                this.toastService.presentToast('Verifique si tiene conectividad', 'danger')
            } else if (err.status === 404) {
                const msg = `No se encuentra el recurso: ${err.url}`;
                this.toastService.presentToast(msg, 'danger')
            }
          return throwError(err);
        }
      )
    );
  }
}