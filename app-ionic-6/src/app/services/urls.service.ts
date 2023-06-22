import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { LoadingController } from "@ionic/angular";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UrlsService {
  parametros = [];
  loading: any;

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController
  ) {
    this.getParametros();
  }

  getParametros() {
    if (this.parametros.length === 0) {
      const url = environment.APIEndpoint + "/parametros";

      this.http.get(url).subscribe(
        (respuesta: any) => {
          this.loadingController.dismiss();
          this.parametros = respuesta.data;
        },
        (error: any) => {
          this.loadingController.dismiss();
          error = error;
        }
      );
  }
  }
  getUrl(descripcion: string) {
    const url =
      environment.APIEndpoint + "/parametros/descripcion/" + descripcion;
    return this.http.get(url).pipe(map((parametro) => parametro));
  }

  getParametro(descripcion: string) {
    return this.parametros.find(
      (element) => element.descripcion === descripcion
    ).valor;
  }
}
