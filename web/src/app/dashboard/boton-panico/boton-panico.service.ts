import { ContactoService } from './../contacto/contacto.service';
import { Injectable } from '@angular/core';
import { Contacto } from '../contacto/contacto.model';
import { interval, Subject, timer, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BotonPanicoService {

  private contactoAlarma: Subject<Contacto> = new Subject<Contacto>();    // consider putting the actual type of the data you will receive
  public contactoAlarmaObs = this.contactoAlarma.asObservable();

  constructor(
    public http: HttpClient,
    public contactoService: ContactoService
  ) {}

  getPanico() {

    const url = environment.APIEndpoint + '/contactos/tipo/panico';
    this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.data.filter((contacto: Contacto) => contacto.updated_at === null);
      })
    ).subscribe(
      res => {
        this.contactoAlarma.next(res[0] ? res[0] : null);
      },
      err => {
        console.log(err);
      }
    );
  }

  activarGuardia() {
    interval(10000).subscribe(
      () => {
        this.getPanico();
      }
    );
  }

  cancelarPanico(contacto: Contacto) {
    if (contacto.id) {

      let url = environment.APIEndpoint + '/contactos';
      url += '/' + contacto.id;

      this.http.put(url, { tipo: contacto.tipo, titulo: contacto.titulo }).subscribe(
        resp => { console.log('resp:', resp); } ,
        err => { console.log('Error:', err); }
      );

    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }

}
