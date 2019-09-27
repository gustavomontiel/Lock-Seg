import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(
    public http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ok( body? ) {
    return of(new HttpResponse({ status: 200, body }));
  }

  getMensajes() {

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
    /*
    const url = environment.APIEndpoint + '/users';

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta;
      })
    );
    */
  }

}
