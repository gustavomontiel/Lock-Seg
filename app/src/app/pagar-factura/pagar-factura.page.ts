import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';

@Component({
  selector: 'app-pagar-factura',
  templateUrl: './pagar-factura.page.html',
  styleUrls: ['./pagar-factura.page.scss'],
})
export class PagarFacturaPage implements OnInit {

    urlPagar: any;
  parametro: any;
  miURL: any;

  constructor(
    private iab: InAppBrowser,
    private urlsService: UrlsService,
    ) { }

  public traerURI(url: string) {
    this.urlPagar = this.urlsService.getParametro(url);
    const browser = this.iab.create(this.urlPagar);
    browser.close();
  }

  
  ngOnInit() {

  }


}
