import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }


  getUrl(descripcion: string) {

    const url = environment.APIEndpoint + '/parametros/descripcion/' + descripcion;

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),

    );
  }

}
