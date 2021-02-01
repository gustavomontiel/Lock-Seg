import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { Platform } from '@ionic/angular';
import { inappbrowserOption, inappbrowserOptionSistem } from '../shared/inappbrowser-options';


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
    private iab: InAppBrowser,
    public platform: Platform
  ) { }

  ngOnInit() {
    
  }

  public verFacturas() {
    const url = this.urlsService.getParametro('ver-facturas');
    // const browser = this.iab.create( url, '_system', inappbrowserOptionSistem );
    // const browser = this.iab.create( url, ( this.platform.is( 'android' ) ? '_blank' : '_system'), inappbrowserOption );
    const browser = this.iab.create( url, '_self', inappbrowserOption );
  }



}
