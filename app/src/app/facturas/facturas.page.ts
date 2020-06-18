import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import { optionsThemeable } from '../shared/optionsThemeable';


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
    private themeableBrowser: ThemeableBrowser,) {  }

  ngOnInit() {
  }

  public traerURI(url: string) {
    this.urlPagar = this.urlsService.getParametro(url);
    optionsThemeable.title.staticText = 'Pagar Facturas';
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.urlPagar, '_blank', optionsThemeable);

  }

}
