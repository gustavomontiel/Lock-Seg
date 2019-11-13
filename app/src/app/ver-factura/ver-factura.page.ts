import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.page.html',
  styleUrls: ['./ver-factura.page.scss'],
})
export class VerFacturaPage implements OnInit {

  urlVerFacturas: any;
  parametro: any;

  constructor(
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getUrlVerFacturas();
  }

  private getUrlVerFacturas() {
    console.log('ver facturas');
    this.urlsService.getUrl('ver-facturas')
      .subscribe(parametro => {
        this.urlVerFacturas = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
      });
  }

}
