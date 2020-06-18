import { Component, OnInit } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pagomiscuentas',
  templateUrl: './pagomiscuentas.page.html',
  styleUrls: ['./pagomiscuentas.page.scss'],
})
export class PagomiscuentasPage implements OnInit {

  urlPagomiscuentas: any;
  parametro: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getUrlPagomiscuentas();
  }

  private getUrlPagomiscuentas() {
    const urlParametro = this.urlsService.getParametro('pagomiscuentas');
    console.log(urlParametro)
    this.urlPagomiscuentas = this.sanitizer.bypassSecurityTrustResourceUrl(urlParametro);
  }

}
