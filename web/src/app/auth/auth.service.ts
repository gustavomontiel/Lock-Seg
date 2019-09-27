import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscrition: Subscription = new Subscription();

  private usuario: User;
  public token: string;

  constructor(
    public http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.token = sessionStorage.getItem('token') || '';
    this.usuario = JSON.parse(sessionStorage.getItem('usuario')) || null;
  }

  crearUsuario(user: User) {

    this.store.dispatch(new ActivarLoadingAction());

    const url = environment.APIEndpoint + '/users';

    return this.http.post(url, user)
    .pipe(
      map((resp: any) => {
        console.log('this.store.dispatch(new DesactivarLoadingAction());');
        this.store.dispatch(new DesactivarLoadingAction());
        return resp;
      }),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        this.store.dispatch(new DesactivarLoadingAction());
        return throwError(err);
      })
    );
  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    const url = environment.APIEndpoint + '/auth/login';
    const usuario = {
      email,
      password
    };

    this.http.post(url, usuario)
      .subscribe(
        (resp: any) => {
          this.usuario = resp.data.user;
          this.token = resp.data.token;
          sessionStorage.setItem('token', resp.data.token);
          sessionStorage.setItem('usuario', JSON.stringify(resp.data.user));
          this.store.dispatch(new DesactivarLoadingAction());
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.store.dispatch(new DesactivarLoadingAction());
          Swal.fire('Error en el login', error.message, 'error');
        }
      );
  }


  logout() {

    this.usuario = null;
    this.token = '';

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);

  }


  isAuth() {
    return (this.token.length > 5) ? true : false;
  }


  getUsuario() {
    return { ...this.usuario };
  }


  getUsuarioId(id: string) {
    Swal.fire({
      text: 'Buscando Datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/users/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        Swal.close();
        return resp;
      })
    );
  }


  getUsuarios() {
    Swal.fire({
      text: 'Buscando usuarios',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/users';

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        Swal.close();
        return respuesta;
      })
    );
  }

  isAdmin() {
    return this.usuario ? this.usuario.roleNames.includes('administrador') : false;
  }


  updateUser(user: User) {

    if (user.id) {

      this.store.dispatch(new ActivarLoadingAction());

      let url = environment.APIEndpoint + '/users';
      url += '/' + user.id;

      return this.http.put(url, user)
      .pipe(
        map((resp: any) => {
          console.log('this.store.dispatch(new DesactivarLoadingAction());');
          this.store.dispatch(new DesactivarLoadingAction());
          return resp;
        }),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          this.store.dispatch(new DesactivarLoadingAction());
          return throwError(err);
        })
      );
    } else {
      console.log('no se puede actualizar un objeto sin id');

    }

  }

}
