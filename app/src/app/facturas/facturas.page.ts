import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { Router } from '@angular/router';


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
    private router: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
  }

  public verFacturas(url: string) {
    this.urlPagar = this.urlsService.getParametro(url);
    console.log(this.urlPagar);
    const browser = this.iab.create(this.urlPagar);
    browser.close();
    this.router.navigate(['facturas']);
  }



}
