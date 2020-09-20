import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';


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
    private iab: InAppBrowser,
    public platform: Platform
  ) { }

  ngOnInit() {
  }

  public verFacturas() {
    const url = this.urlsService.getParametro('ver-facturas');
    const browser = this.iab.create( url, ( this.platform.is( 'android' ) ? '_blank' : '_system') );
  }



}
