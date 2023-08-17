import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlsService } from './urls.service';
import { map } from 'rxjs/internal/operators/map';
import { from, of, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class DeitresService {
  deitresAccessToken: string;
  lastTime: number;
  clientId: string; // = 'CM6F6HjmsorOzSEp9EYp6VkWBFbCvplq'; // buena: CM6F6HjmsorOzSEp9EYp6VkWBFbCvplq
  clientSecret: string; // = 'j0oyKuqK6csJ8pxnlzus62st2vpVPZYhzRbnjT7BxAZdnEJp6vWETvsa3jHpzoBy';
  public panelSeleccionado: any;

  constructor(
    private httpClient: HttpClient,
    private http: HTTP,
    private urlsService: UrlsService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    console.log('DeitresService constructor');
    this.http.setRequestTimeout(90);
  }

  isTimeToLogin(): boolean {
    const lastTime = !this.lastTime
      ? new Date().getTime() - 1000 * 60 * 61
      : this.lastTime;

    this.lastTime = new Date().getTime();

    return this.lastTime > lastTime + 1000 * 60 * 60;
  }

  getHttpAuthParams() {
    this.clientId = this.urlsService.getParametro('clientId');
    this.clientSecret = this.urlsService.getParametro('clientSecret');
    let params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    return params.toString();
  }

  getHttpHeader() {
    return {
      Authorization: `Bearer ${this.deitresAccessToken}`,
    };
  }

  getBodyPanelParams(account, userCode) {
    return {
      account: account,
      userCode: userCode,
      type: 'total',
    };
  }

  getBodyZonaParams(account, zoneID) {
    return {
      account: account,
      zoneID: zoneID,
    };
  }

  async getToken() {
    if (this.isTimeToLogin()) {
      this.deitresAccessToken = '';

      let params = this.getHttpAuthParams();
      let headers = new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      });

      const url = ' https://auth.deitres.com/oauth/token';

      await this.httpClient
        .post(url, params, { headers: headers })
        .pipe(
          map((data: any) => {
            this.deitresAccessToken = data.access_token!;
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

  async consultaPanel(account: string, userCode: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {

      const url = `https://api.citymesh.deitres.com/int/partition?account=${account}&userCode=${userCode}`;
      const headers = this.getHttpHeader();
      this.loadingService.present();
      return from(
        this.http
          .get(url, {}, headers)
          .then((data: any) => {
            data = JSON.parse(data.data);
            if (!data.success) {
              this.toastService.presentToast(data.reason, 'danger');
            }
            return data;
          })
          .catch((err) => {
            console.log('consultaPanel err', err);
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

  async armarPanel(account: string, userCode: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {
      const body = this.getBodyPanelParams(account, userCode);
      const url = `https://api.citymesh.deitres.com/int/partition/arm?account=${account}&userCode=${userCode}&type=total`;
      const headers = this.getHttpHeader();

      this.loadingService.present();
      return from(
        this.http
          .post(url, body, headers)
          .then((data: any) => {
            data = JSON.parse(data.data);
            if (!data.success) {
              this.toastService.presentToast(data.errorMessage, 'danger');
            } else {
              let color = 'success';
              let msg = data.message ? data.message : '';

              if (data.armed) {
                msg += data.message ? data.message : 'Panel armado';
              } else {
                color = 'danger';
                console.log(data);
                msg += data.errorMessage
                  ? data.errorMessage + data.openZones.join()
                  : 'No se pudo armar el manel';
              }


              this.toastService.presentToast(msg, color);
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
    } else {
      return throwError('Error');
    }
  }

  async desarmarPanel(account: string, userCode: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {
      const body = this.getBodyPanelParams(account, userCode);
      const url = `https://api.citymesh.deitres.com/int/partition/disarm?account=${account}&userCode=${userCode}`;
      const headers = this.getHttpHeader();

      this.loadingService.present();
      return from(
        this.http
          .post(url, body, headers)
          .then((data: any) => {
            data = JSON.parse(data.data);
            if (!data.success) {
              this.toastService.presentToast(data.reason, 'danger');
            } else {
              this.toastService.presentToast(
                'Panel desarmado correctamente',
                'success'
              );
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
    } else {
      return throwError('Error');
    }
  }

  async consultaZonas(account: string) {
    const i = await this.getToken();
    if (this.deitresAccessToken) {
      const url = `https://api.citymesh.deitres.com/int/devices?account=${account}`;
      const headers = this.getHttpHeader();

      this.loadingService.present();
      return from(
        this.http
          .get(url, {}, headers)
          .then((data: any) => {
            data = JSON.parse(data.data);
            if (!data.success) {
              this.toastService.presentToast(data.reason, 'danger');
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
    } else {
      return throwError('Error');
    }
  }

  async incluirZona(account: string, zoneID: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {
      const body = this.getBodyZonaParams(account, zoneID);

      const url = `https://api.citymesh.deitres.com/int/devices/include?account=${account}&zoneID=${zoneID}`;
      const headers = this.getHttpHeader();

      this.loadingService.present();
      return from(
        this.http
          .post(url, body, headers)
          .then((data: any) => {
            data = JSON.parse(data.data);
            if (!data.success) {
              const msg = data.reason || data.message || 'Error desconocido';
              this.toastService.presentToast(msg, 'danger');
            } else {
              this.toastService.presentToast('Zona incluida', 'success');
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
    } else {
      return throwError('Error');
    }
  }

  async excluirZona(account: string, zoneID: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {
      const body = this.getBodyZonaParams(account, zoneID);

      const url = `https://api.citymesh.deitres.com/int/devices/exclude?account=${account}&zoneID=${zoneID}`;
      const headers = this.getHttpHeader();

      this.loadingService.present();
      return from(
        this.http
          .post(url, body, headers)
          .then((data: any) => {
            data = JSON.parse(data.data);
            if (!data.success) {
              const msg = data.reason || data.message || 'Error desconocido';
              this.toastService.presentToast(msg, 'danger');
            } else {
              this.toastService.presentToast('Zona exncluida', 'success');
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
    } else {
      return throwError('Error');
    }
  }
}
