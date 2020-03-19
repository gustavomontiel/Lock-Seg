import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.page.html',
  styleUrls: ['./ver-factura.page.scss'],
})
export class VerFacturaPage implements OnInit {

  urlVerFacturas: any;
  parametro: any;
  loading: any;

  constructor(
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getUrlVerFacturas();
  }


  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Cargando ...'
    });
    // Present the loading controller
    await this.loading.present();
  }

  private async getUrlVerFacturas() {
    console.log('ver facturas');
    await this.presentLoading();
    this.urlsService.getUrl('ver-facturas')
      .pipe(
        finalize(async () => {
          // Hide the loading spinner on success or error
          await this.loading.dismiss();
        })
      )
      .subscribe(parametro => {
        this.urlVerFacturas = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
      });
  }

}
