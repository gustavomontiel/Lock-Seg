import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class ContactoService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }


  insertarContacto(body) {

    const url = 'http://lock-api.grupo-sim.com.ar/contactos';

    return this.http.post(url, body).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),

    );

  }


}
