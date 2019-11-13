import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Contacto } from './contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  getContactos(tipo: string) {

    Swal.fire({
      text: 'Buscando datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/contactos';

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        Swal.close();
        return respuesta.data.filter( ( contacto: Contacto ) => contacto.tipo == tipo );
      })
    );
  }

}
