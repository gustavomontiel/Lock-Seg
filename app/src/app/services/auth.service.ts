import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(true);
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.isLoggedIn();
    });
  }


  isLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      console.log('isLoggedIn', response);
      
      if (response) {
        this.authState.next(true);
        
        /*
        const url = environment.APIEndpoint + 'auth/verify/' + response.data.token;
        this.http.get(url).subscribe(
          resp => {this.authState.next(true)},
          error => {this.authState.next(false)},
        )
        */
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
          
          console.log(resp.data.user);

          this.storage.set('EMAIL', resp.data.user.email).then((email) => {
            this.router.navigate(['home']);
            this.authState.next(true);
            return email;
          });

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
