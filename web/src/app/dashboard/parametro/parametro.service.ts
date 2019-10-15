import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivarLoadingAction, DesactivarLoadingAction } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';
import { Parametro } from './parametro.model';


@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(
    public http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) { }

  getParametros() {

    Swal.fire({
      text: 'Buscando Datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/parametros';

    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log(resp);
        Swal.close();
        return resp;
      })
    );
  }

  getParametroById(id: string) {
    Swal.fire({
      text: 'Buscando Datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/parametros/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        Swal.close();
        return resp;
      })
    );
  }

  updateParametro(param: Parametro) {

    if (param.id) {

      Swal.fire({
        text: 'Actualizando Datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      this.store.dispatch(new ActivarLoadingAction());

      let url = environment.APIEndpoint + '/parametros';
      url += '/' + param.id;

      return this.http.put(url, param)
      .pipe(
        map((resp: any) => {
          Swal.close();
          this.store.dispatch(new DesactivarLoadingAction());
          return resp;
        }),
        catchError(err => {
          console.log('Error:', err);
          Swal.close();
          this.store.dispatch(new DesactivarLoadingAction());
          return throwError(err);
        })
      );
    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }

  deleteParametro(param: Parametro) {

    Swal.fire({
      text: 'Procesando solicitud',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/parametros/' + param.id;
    return this.http.delete(url)
      .pipe(
        map((resp: any) => {
          Swal.close();
          console.log('eliminarLineaPedido resp', resp);
          return resp;
        })
      );

  }

  crearParametro(param: Parametro) {

    this.store.dispatch(new ActivarLoadingAction());

    Swal.fire({
      text: 'Creando parámetro',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/parametros';

    return this.http.post(url, param)
      .pipe(
        map((resp: any) => {
          this.store.dispatch(new DesactivarLoadingAction());
          Swal.close();
          return resp;
        }),
        catchError(err => {
          console.log('error:', err);
          Swal.close();
          this.store.dispatch(new DesactivarLoadingAction());
          return throwError(err);
        })
      );
  }

}
