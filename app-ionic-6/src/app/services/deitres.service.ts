import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlsService } from './urls.service';
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeitresService {
  deitresAccessToken: string;
  lastTime: number;
  clientId: string; // = 'CM6F6HjmsorOzSEp9EYp6VkWBFbCvplq'; // buena: CM6F6HjmsorOzSEp9EYp6VkWBFbCvplq
  clientSecret: string; // = 'j0oyKuqK6csJ8pxnlzus62st2vpVPZYhzRbnjT7BxAZdnEJp6vWETvsa3jHpzoBy';

  constructor(
    private http: HttpClient, 
    private urlsService: UrlsService,
    private toastService: ToastService
    ) {
    console.log('DeitresService constructor');
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

  async getToken() {

    if (this.isTimeToLogin()) {
      this.deitresAccessToken = '';

      let params = this.getHttpAuthParams();
      let headers = new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      });

      const url = ' https://auth.deitres.com/oauth/token';

      await this.http.post(url, params, { headers: headers }).pipe(
        map((data: any) => {
          this.deitresAccessToken = data.access_token!;
        }),
        catchError((err) => {
          const msg = err.error_description || 'Error, no se puedo realizar la acción';
          this.toastService.presentToast(msg, 'danger')
          return throwError(err);
        })
      ).toPromise();
      
    } 
  }

  getHttpHeader() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.deitresAccessToken}`,
      'Access-Control-Allow-Origin': '*',
    });
  }

  async consultaPanel(account: string, userCode: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {
      const url = `https://api.citymesh.deitres.com/int/partition?account=${account}&userCode=${userCode}`;
      const headers = this.getHttpHeader();
      return this.http.get(url, { headers: headers }).pipe(
        tap((data: any) => {
          if (!data.success) {
            this.toastService.presentToast(data.reason, 'danger')
          }
        }),
        catchError((err) => {
          const msg = err.error_description || 'Error, no se puedo realizar la acción';
          this.toastService.presentToast(msg, 'danger')
          return throwError(err);
        })
      );
    }
  }

  async armarPanel(account: string, userCode: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {

      const body = {
        "account": account,
        "userCode": userCode,
        "type": "total"
       }
       
      const url = `https://api.citymesh.deitres.com/int/partition/arm?account=${account}&userCode=${userCode}&type=total`;
      const headers = this.getHttpHeader();
      return this.http.post(url, body, { headers: headers }).pipe(
        tap((data: any) => {
          if (!data.success) {
            this.toastService.presentToast(data.reason, 'danger')
          }
        }),
        catchError((err) => {
          const msg = err.error_description || 'Error, no se puedo realizar la acción';
          this.toastService.presentToast(msg, 'danger')
          return throwError(err);
        })
      );

    } else {
      return throwError('Error');
    }
  }


  async desarmarPanel(account: string, userCode: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {

      const body = {
        "account": account,
        "userCode": userCode,
        "type": "total"
       }
       
      const url = `https://api.citymesh.deitres.com/int/partition/disarm?account=${account}&userCode=${userCode}`;
      const headers = this.getHttpHeader();
      return this.http.post(url, body, { headers: headers }).pipe(
        tap((data: any) => {
          if (!data.success) {
            this.toastService.presentToast(data.reason, 'danger')
          }
        }),
        catchError((err) => {
          const msg = err.error_description || 'Error, no se puedo realizar la acción';
          this.toastService.presentToast(msg, 'danger')
          return throwError(err);
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
      return this.http.get(url, { headers: headers }).pipe(
        tap((data: any) => {
          if (!data.success) {
            this.toastService.presentToast(data.reason, 'danger')
          }
        }),
        catchError((err) => {
          const msg = err.error_description || 'Error, no se puedo realizar la acción';
          this.toastService.presentToast(msg, 'danger')
          return throwError(msg);
        })
      );
    } else {
      return throwError('Error');
    }
  }


  async incluirZona(account: string, zoneID: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {

      const body = {
        "account": account,
        "zoneID": zoneID
      }

      const url = `https://api.citymesh.deitres.com/int/devices/include?account=${account}&zoneID=${zoneID}`;
      const headers = this.getHttpHeader();
      return this.http.post(url, body, { headers: headers }).pipe(
        tap((data: any) => {
          if (!data.success) {
            this.toastService.presentToast(data.reason, 'danger')
          }
        }),
        catchError((err) => {
          const msg = err.error_description || 'Error, no se puedo realizar la acción';
          this.toastService.presentToast(msg, 'danger')
          return throwError(err);
        })
      );

    } else {
      return throwError('Error');
    }
  }


  async excluirZona(account: string, zoneID: string) {
    const i = await this.getToken();

    if (this.deitresAccessToken) {

      const body = {
        "account": account,
        "zoneID": zoneID
      }

      const url = `https://api.citymesh.deitres.com/int/devices/exclude?account=${account}&zoneID=${zoneID}`;
      const headers = this.getHttpHeader();
      return this.http.post(url, body, { headers: headers });

    } else {
      return throwError('Error');
    }
  }

}
