import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { InappBrowserOptionService } from '../services/inapp-browser-option.service';


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
    public iabOptionService: InappBrowserOptionService
  ) { }

  ngOnInit() {
    
  }

  public verFacturas() {
    const url = this.urlsService.getParametro('ver-facturas');
    const browser = this.iab.create( url, '_blank', this.iabOptionService.inappbrowserOption );
  }



}
