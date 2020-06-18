import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import { optionsThemeable } from '../shared/optionsThemeable';



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
    private themeableBrowser: ThemeableBrowser
  ) { }

  ngOnInit() {
    this.getUrlVerFacturas();
  }

  private async getUrlVerFacturas() {
    this.urlVerFacturas = this.urlsService.getParametro('ver-facturas');
    optionsThemeable.title.staticText = 'Ver facturas';
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.urlVerFacturas, '_blank', optionsThemeable);
  }

}
