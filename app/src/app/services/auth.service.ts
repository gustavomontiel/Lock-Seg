import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }


  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  loginUsuario(username: string, password: string) {

    const usuario = {
      email: username,
      password: password
    };

    const url = environment.APIEndpoint + '/auth/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.storage.set('USER_INFO', resp).then((response) => {
          this.router.navigate(['home']);
          this.authState.next(true);
          return response;
        });
      }),
      catchError(err => {
        console.log('error', err);
        return throwError(err);
      })
    );

  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  cambiarPass(password: string, passwordNuevo: string) {

    const usuario = {
      password,
      password_nuevo: passwordNuevo,
    };

    console.log(usuario);

    const url = environment.APIEndpoint + '/actualizar-password';

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        this.storage.set('USER_INFO', resp).then((response) => {
          this.router.navigate(['home']);
          this.authState.next(true);
          console.log(response);
          return response;
        });
      }),
      catchError(err => {
        console.log('error', err);
        return throwError(err);
      })
    );

  }

}
