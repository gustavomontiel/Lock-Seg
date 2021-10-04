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
import { StorageService } from './storage.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        public toastController: ToastController,
        private storageService: StorageService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return from(this.storageService.get('USER_INFO'))
            .pipe(
                switchMap(userInfo => {
                    
                    if (userInfo && userInfo.data && userInfo.data.token) {
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
