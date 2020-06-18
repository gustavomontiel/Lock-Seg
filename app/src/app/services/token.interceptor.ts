import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        public toastController: ToastController,
        private storage: Storage
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*
        // tslint:disable-next-line: max-line-length
        const token = 'v2.local.4SchpKDpFJ3zrJ4cEKd3w5noVPc6HNnIPrnvnb2k-SxbV-to1F86RI0ACD4RsQ3kUBdDmR9cAYUgWvQ8HqlR2ru5Mee7vISqpQlUU3j5sS_BGt-c8buwbwxRj36-YA';

        if (token) {
            request = request.clone({
                setHeaders: {
                    'X-Authorization': 'Bearer ' + token
                }
            });
        }
        return next.handle(request).pipe(
            catchError(
                err => {
                    return throwError(err);
                }
            )
        );
        */
        return from(this.storage.get('USER_INFO'))
            .pipe(
                switchMap(userInfo => {
                    if (userInfo && userInfo.data.token) {
                        request = request.clone({
                            setHeaders: {
                                Authorization: userInfo.data.token
                            }
                        });
                    }

                    if (!request.headers.has('Content-Type')) {
                        request = request.clone({
                            setHeaders: {
                                'content-type': 'application/json'
                            }
                        });
                    }

                    request = request.clone({
                        headers: request.headers.set('Accept', 'application/json')
                    });

                    return next.handle(request).pipe(
                        map((event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                                console.log('event--->>>', event);
                            }
                            return event;
                        }),
                        catchError((error: HttpErrorResponse) => {
                            if (error.status === 401) {
                                if (error.error.success === false) {
                                    this.presentToast('Datos incorrectos');
                                } else {
                                    this.router.navigate(['login']);
                                }
                            }
                            return throwError(error);
                        }));
                })
            );
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
}
