import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-historial-alarma',
  templateUrl: './historial-alarma.page.html',
  styleUrls: ['./historial-alarma.page.scss'],
})
export class HistorialAlarmaPage implements OnInit {
  urlHistorial: any;
  parametro: any;
  loading: any;

  constructor(
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer,
    public loadingController: LoadingController
  ) { }

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
