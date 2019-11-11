import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { map, filter, mergeMap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {  }

  
  private getAuthHeaders() {
    return from(this.storage.get('USER_INFO').data.token);
  }



  getUrl(nombre: string) {

    var responseStream = this.getAuthHeaders().pipe(
      mergeMap( userinfo => {
      console.log(userinfo);
      })
    );

      /*console.log(response.data.token);



      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': response.data.token
      });

      const url = 'http://lock-api.grupo-sim.com.ar/parametros/'+nombre;

      return this.http.get(url, { headers: headers }).pipe(
        map((respuesta: any) => {
          return respuesta;
        }),
        
      );*/
 

    
  }
}
