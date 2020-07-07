import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  parametros = [];
  loading: any;

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController,
  ) {

    if ( this.parametros.length === 0 ) {
      this.presentLoading();
      const url = environment.APIEndpoint + 'parametros';
    
      console.log('this.presentLoading()');
      
      this.http.get(url).
        subscribe(
          (respuesta: any) => {
            this.parametros = respuesta.data;
            this.loadingController.dismiss();
          },
          (error: any) => {
            error = error;
            this.loadingController.dismiss();
          }
        );
    }
  }

  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Cargando ...XXX'
    });
    // Present the loading controller
    await this.loading.present();
  }

  getUrl(descripcion: string) {
    const url = environment.APIEndpoint + 'parametros/descripcion/' + descripcion;
    return this.http.get(url).pipe(map(parametro => parametro));
  }

  getParametro(descripcion: string) {
    return this.parametros.find(element => element.descripcion === descripcion).valor;
  }
}
