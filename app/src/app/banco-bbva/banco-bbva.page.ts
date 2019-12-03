import { Component, OnInit } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-banco-bbva',
  templateUrl: './banco-bbva.page.html',
  styleUrls: ['./banco-bbva.page.scss'],
})
export class BancoBbvaPage implements OnInit {

  urlBancoFrances: any;
  parametro: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getUrlBancoFrances();
  }

  private getUrlBancoFrances() {
    console.log('Frances');
    this.urlsService.getUrl('bancofrances')
      .subscribe(parametro => {
        this.urlBancoFrances = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
      });
  }

}
