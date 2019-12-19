import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { map, filter, mergeMap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  getPromocionesAPI() {

    const url = 'http://lock-api.grupo-sim.com.ar/promociones';

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),

    );
  }
}
