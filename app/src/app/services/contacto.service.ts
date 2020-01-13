import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ContactoService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }


  insertarContacto(body) {

    const url = environment.APIEndpoint + '/contactos';

    return this.http.post(url, body).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),

    );

  }

}
