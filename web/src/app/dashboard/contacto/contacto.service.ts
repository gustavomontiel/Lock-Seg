import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { Contacto } from './contacto.model';
import { throwError } from 'rxjs';

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
        return respuesta.data.filter( ( contacto: Contacto ) => contacto.tipo === tipo );
      })
    );
  }

  updateContacto(contacto: Contacto) {

    if (contacto.id) {

      Swal.fire({
        text: 'Actualizando Datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      let url = environment.APIEndpoint + '/contactos';
      url += '/' + contacto.id;
      console.log(url);

      return this.http.put(url, { tipo: contacto.tipo, titulo: contacto.titulo })
      .pipe(
        map((resp: any) => {
          Swal.close();
          console.log(resp);
          return resp;
        }),
        catchError(err => {
          console.log('Error:', err);
          Swal.close();
          return throwError(err);
        })
      );
    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }

}
