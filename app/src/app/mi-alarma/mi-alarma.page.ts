import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-mi-alarma',
  templateUrl: './mi-alarma.page.html',
  styleUrls: ['./mi-alarma.page.scss'],
})
export class MiAlarmaPage implements OnInit {

  options: InAppBrowserOptions = {
    location: 'no', // Or 'no'
    hidden: 'no', // Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes', // Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', // Android only
    closebuttoncaption: 'Close', // iOS only
    disallowoverscroll: 'no', // iOS only
    toolbar: 'yes', // iOS only
    enableViewportScale: 'no', // iOS only
    allowInlineMediaPlayback: 'no', // iOS only
    presentationstyle: 'pagesheet', // iOS only
    fullscreen: 'yes', // Windows only
  };

  urlHistorial: any;
  parametro: any;
  loading: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer,
    public loadingController: LoadingController) { }

  public openWithInAppBrowser(url: string) {
    const target = '_blank';
    this.theInAppBrowser.create(url, target, this.options);
  }
  public openWithCordovaBrowser(url: string) {
    const target = '_self';
    this.theInAppBrowser.create(url, target, this.options);
  }
  ngOnInit() {
    this.getUrlHistorial();
  }


  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Cargando ...'
    });
    // Present the loading controller
    await this.loading.present();
  }

  private async getUrlHistorial() {
    const urlParametro = this.urlsService.getParametro('historial');
    this.urlHistorial = this.sanitizer.bypassSecurityTrustResourceUrl(urlParametro);
  }

}
