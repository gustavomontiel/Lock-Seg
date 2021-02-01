import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { inappbrowserOptionSistem } from '../shared/inappbrowser-options';

@Component( {
  selector: 'app-pagar-factura',
  templateUrl: './pagar-factura.page.html',
  styleUrls: [ './pagar-factura.page.scss' ],
} )
export class PagarFacturaPage implements OnInit {

  urlPagar: any;
  parametro: any;
  miURL: any;

  constructor(
    private iab: InAppBrowser,
    private urlsService: UrlsService,
  ) { }


  public traerURI( url: string ) {

    this.urlPagar = this.urlsService.getParametro( url );

    const browser = this.iab.create( this.urlPagar, '_system', inappbrowserOptionSistem );
  
  }


  ngOnInit() {

  }


}
