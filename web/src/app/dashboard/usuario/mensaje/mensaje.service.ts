import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Mensaje } from './mensaje.model';
import { ActivarLoadingAction, DesactivarLoadingAction } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(
    public http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) { }

  /*
  ok( body? ) {
    return of(new HttpResponse({ status: 200, body }));
  }
*/
  getMensajes(id: number) {
    console.log('getMensajes');

    /*
        return this.ok(
          [
            {
              enviado: '2019-09-09',
              fechaEntrega: '2019-09-09',
              mensaje: 'mensaje 1'
            },
            {
              enviado: '2019-09-09',
              fechaEntrega: '2019-09-09',
              mensaje: 'mensaje 2'
            },
            {
              enviado: '2019-09-09',
              fechaEntrega: '2019-09-09',
              mensaje: 'mensaje 3'
            }
          ]
        );
      */
    const url = environment.APIEndpoint + '/mensajes';

    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log(resp);
        return resp.data;
      })
    );

  }

  crearMensaje(msg: Mensaje) {

    this.store.dispatch(new ActivarLoadingAction());

    Swal.fire({
      text: 'Enviando mensaje',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/mensajes';

    return this.http.post(url, msg)
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
