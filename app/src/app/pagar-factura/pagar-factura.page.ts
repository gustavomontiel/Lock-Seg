import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import { optionsThemeable } from '../shared/optionsThemeable';

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
    private themeableBrowser: ThemeableBrowser,
    private urlsService: UrlsService,
    ) { }

  public traerURI(url: string) {
    this.urlPagar = this.urlsService.getParametro(url);
    optionsThemeable.title.staticText = 'Pagar Facturas';
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.urlPagar, '_blank', optionsThemeable);
  }

  
  ngOnInit() {

  }


}
