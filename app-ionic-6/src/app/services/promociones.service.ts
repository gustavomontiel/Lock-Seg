import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  constructor(
    private http: HttpClient,
  ) { }

  getPromocionesAPI() {

    const url = environment.APIEndpoint + '/promociones';

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),

    );
  }
}
