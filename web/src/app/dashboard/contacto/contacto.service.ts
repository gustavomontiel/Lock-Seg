import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { Contacto } from './contacto.model';
import { throwError, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  cantContactos = {
    panico: 0,
    atencion: 0,
    movil: 0,
    servicio: 0
  };

  constructor(
    public http: HttpClient,
    private router: Router
  ) {
    this.getCantidades();
    this.comtrolarCatContactos();
  }

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

  getCantidades() {

    const url = environment.APIEndpoint + '/contactos';

    this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.data;
      })
    ).subscribe(
      res => {
        if ( res ) {
          const atencion = res.filter((contacto: Contacto) => contacto.tipo === 'atencion' && contacto.notificado_el === null);
          this.cantContactos.atencion = atencion.length;

          const movil = res.filter((contacto: Contacto) => contacto.tipo === 'movil' && contacto.notificado_el === null);
          this.cantContactos.movil = movil.length;

          const panico = res.filter((contacto: Contacto) => contacto.tipo === 'panico' && contacto.notificado_el === null);
          this.cantContactos.panico = panico.length;

          const servicio = res.filter((contacto: Contacto) => contacto.tipo === 'servicio' && contacto.notificado_el === null);
          this.cantContactos.servicio = servicio.length;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  comtrolarCatContactos() {
    interval(10000).subscribe(
      () => {
        this.getCantidades();
      }
    );
  }

  notificarContacto(contacto: Contacto) {
    if (contacto.id) {

      let url = environment.APIEndpoint + '/contacto/silenciar';
      url += '/' + contacto.id;
      return this.http.put( url, contacto );

    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }

}
