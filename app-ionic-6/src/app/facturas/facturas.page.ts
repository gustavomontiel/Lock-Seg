import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { InappBrowserOptionService } from '../services/inapp-browser-option.service';
import { Plugins } from '@capacitor/core';

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

  async verFacturas() {

    const { Device } = Plugins;
    let device = await Device.getInfo();
        
    const url = this.urlsService.getParametro('ver-facturas');
    // Si es ios se abre en el navegador del sistema operativo
    const target = (device.platform === 'ios') ? '_system' : '_blank';
    const browser = this.iab.create( url, target, this.iabOptionService.inappbrowserOption );

  }



}
