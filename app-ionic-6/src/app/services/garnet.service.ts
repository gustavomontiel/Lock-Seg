import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class GarnetService {
  garnetURL: string = 'https://web.garnetcontrol.app/hsi_interface/user_api/v1';
  accessToken: string;
  appKey: string;
  appId: string;
  clientSecret: string;
  lastTime: any;


  constructor(
    private httpClient: HttpClient,
    private http: HTTP,
    private urlsService: UrlsService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {   }

  getHeaders(token = false) {
    if (token) {
      return {
        "Content-Type": "application/json",
        "x-access-token": this.accessToken
      };
    } else {
      return {
        "Content-Type": "application/json",
      };
    }
  }

  getBody() {
    return {
      "appId": this.urlsService.getParametro('appId'),
      "appKey": this.urlsService.getParametro('appKey')
    }
  }

  isTimeToLogin(): boolean {
    const lastTime = !this.lastTime
      ? new Date().getTime() - 1000 * 60 * 61
      : this.lastTime;

    this.lastTime = new Date().getTime();

    return this.lastTime > lastTime + 1000 * 60 * 60;
  }

  async getToken() {    /*Obtiene el Token  */
    if (this.isTimeToLogin()) {
      const url = `${this.garnetURL}/login`;
      this.accessToken = ''
      let body = this.getBody();
      let headers = this.getHeaders()

      await this.httpClient
        .post(url, body, { headers: headers })
        .pipe(
          map((data: any) => {
            console.log(data);

            this.accessToken = data.accessToken;
            console.log(this.accessToken);


          }),
          catchError((err) => {
            const msg =
              err.error_description || 'Error, no se puedo realizar la acción';
            this.toastService.presentToast(msg, 'danger');
            return throwError(err);
          })
        )
        .toPromise();
    }
  }

  descifrarEstado(estado) { /* Convierte la respuesta de la API a algo comprensible */
    console.log(estado);

    const regProblemas = (this.hexaBinario(estado.panelStatus.slice(1, 3))
      + this.hexaBinario(estado.panelStatus.slice(3, 5))).split('');

    const estadoParticiones = (this.hexaBinario(estado.panelStatus.slice(5, 7))).split('');

    const estadoSalidas = (this.hexaBinario(estado.panelStatus.slice(7, 9))).split('');

    const zonaAbierta = (this.hexaBinario(estado.panelStatus.slice(9, 11))
      + this.hexaBinario(estado.panelStatus.slice(11, 13))
      + this.hexaBinario(estado.panelStatus.slice(13, 15))
      + this.hexaBinario(estado.panelStatus.slice(15, 17))).split('');

    const zonaAlarma = (this.hexaBinario(estado.panelStatus.slice(17, 19))
      + this.hexaBinario(estado.panelStatus.slice(19, 21))
      + this.hexaBinario(estado.panelStatus.slice(21, 23))
      + this.hexaBinario(estado.panelStatus.slice(23, 25))).split('');

    const zonaInhibida = (this.hexaBinario(estado.panelStatus.slice(25, 27))
      + this.hexaBinario(estado.panelStatus.slice(27, 29))
      + this.hexaBinario(estado.panelStatus.slice(29, 31))
      + this.hexaBinario(estado.panelStatus.slice(31, 33))).split('');

    return { regProblemas, estadoParticiones, estadoSalidas, zonaAbierta, zonaAlarma, zonaInhibida }
  }

  hexaBinario(valorHexadecimal: string): string { /* Convierte un valor Hexadecima a Binario */
    const valorDecimal = parseInt(valorHexadecimal, 16);
    const valorBinario = valorDecimal.toString(2).padStart(8, '0');
    const reversedString = valorBinario.toString().split('').reverse().join('');
    return reversedString;
  }

  async consultaPanel(numeroSistema: string, seq: string) {    /*Consulta de estado de Panel  */
    const token = await this.getToken();
    if (this.accessToken) {
      const url = `${this.garnetURL}/panel_commands/state?numeroSistema=${numeroSistema}&seq=${seq}`;
      if (this.accessToken) {
        const headers = {
          "x-access-token": this.accessToken,
          "Content-Type": "application/json",
        };
        this.loadingService.present();
        return from(
          this.http
            .post(url, {}, headers)
            .then((data: any) => {
              data = JSON.parse(data.data);
              const status = this.descifrarEstado(data)
              return status
            })
            .finally(() => {
              this.loadingService.dismiss();
            })
        );
      }
    }
  }

  async armarPanel(numeroSistema: string, seq: string, userNumber: string, numeroParticion: string) {    /*Arma la Partición  */
    const token = await this.getToken();
    if (this.accessToken) {
      const url = `${this.garnetURL}/panel_commands/arm/away?numeroSistema=${numeroSistema}&seq=${seq}&numeroSistema=${numeroParticion}&userNumber=${userNumber}`;
      const headers = {
        "x-access-token": this.accessToken,
        "Content-Type": "application/json",
      };
      return from(
        this.http
          .post(url, {}, headers)
          .then((data: any) => {
            data = JSON.parse(data.data);
            if (data.result === 'OK') {
              this.toastService.presentToast('Partición armada', 'success');
            } else {
              this.toastService.presentToast('No se pudo armar la partición', 'danger');
            }
            return data;
          })
          .catch((err) => {
            const msg =
              err.error_description || 'Error, no se puedo realizar la acción';
            this.toastService.presentToast(msg, 'danger');
            return err;
          })
          .finally(() => {
            this.loadingService.dismiss();
          })
      );
    }
  }

  async desarmarPanel(numeroSistema: string, seq: string, userNumber: string, numeroParticion: string) {    /* Desarma la Partición  */
    const token = await this.getToken();
    if (this.accessToken) {
      const url = `${this.garnetURL}/panel_commands/disarm?numeroSistema=${numeroSistema}&seq=${seq}&numeroSistema=${numeroParticion}&userNumber=${userNumber}`;
      const headers = {
        "x-access-token": this.accessToken,
        "Content-Type": "application/json",
      };
      return from(
        this.http
          .post(url, {}, headers)
          .then((data: any) => {
            data = JSON.parse(data.data);
            if (data.result === 'OK') {
              this.toastService.presentToast('Partición desarmada', 'success');
            } else {
              this.toastService.presentToast('No se pudo desarmar la partición', 'danger');
            }
            return data;
          })
          .catch((err) => {
            const msg =
              err.error_description || 'Error, no se puedo realizar la acción';
            this.toastService.presentToast(msg, 'danger');
            return err;
          })
          .finally(() => {
            this.loadingService.dismiss();
          })
      );
    }
  }

  async incluirZona(numeroSistema: string, zoneID: string, seq: string) {    /*Desinhibe una zona */
    const token = await this.getToken();
    if (this.accessToken) {
      const url = `${this.garnetURL}/panel_commands/unbypass/${zoneID + 1}?numeroSistema=${numeroSistema}&seq=${seq}`;
      const headers = {
        "x-access-token": this.accessToken,
        "Content-Type": "application/json",
      };
      return from(
        this.http
          .post(url, {}, headers)
          .then((data: any) => {
            data = JSON.parse(data.data)
            if (data.result === 'OK') {
              this.toastService.presentToast('Zona incluida', 'success');
            } else {
              this.toastService.presentToast('No se pudo incluir la zona', 'danger');
            }
            return data;
          })
      );
    }
  }

  async excluirZona(numeroSistema: string, zoneID: string, seq: string) {    /*Inhibe una zona */
    const token = await this.getToken();
    if (this.accessToken) {
      const url = `${this.garnetURL}/panel_commands/bypass/${zoneID + 1}?numeroSistema=${numeroSistema}&seq=${seq}`;
      const headers = {
        "x-access-token": this.accessToken,
        "Content-Type": "application/json",
      };
      return from(
        this.http
          .post(url, {}, headers)
          .then((data: any) => {
            data = JSON.parse(data.data)
            if (data.result === 'OK') {
              this.toastService.presentToast('Zona Excluida', 'success');
            } else {
              this.toastService.presentToast('No se pudo excluir la zona', 'danger');
            }
            return data;
          })
      );
    }
  }
}
