import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.page.html',
  styleUrls: ['./facturas.page.scss'],
})
export class FacturasPage implements OnInit {

  urlPagar: any;
  parametro: any;
  miURL: any;

  constructor(
    private urlsService: UrlsService,
    private iab: InAppBrowser
    ) {  }

  ngOnInit() {
  }

  public traerURI(url: string) {
    let options = 'location=no,toolbarposition=bottom,toolbarcolor=#488aff';
    this.urlPagar = this.urlsService.getParametro(url);
    const browser = this.iab.create(this.urlPagar);
    browser.close();

  }

  

}
