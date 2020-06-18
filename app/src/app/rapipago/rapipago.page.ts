import { Component, OnInit } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-rapipago',
  templateUrl: './rapipago.page.html',
  styleUrls: ['./rapipago.page.scss'],
})
export class RapipagoPage implements OnInit {

  urlRapipago: any;
  parametro: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getUrlRapipago();
  }

  private getUrlRapipago() {
    const urlParametro = this.urlsService.getParametro('rapipago');
    this.urlRapipago = this.sanitizer.bypassSecurityTrustResourceUrl(urlParametro);
  }

}
