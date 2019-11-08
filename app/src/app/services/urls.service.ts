import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {  }


  getUrl(nombre: string) {

    const url = 'http://lock-api.grupo-sim.com.ar/parametros/'+nombre;

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      
    );
  }
}
