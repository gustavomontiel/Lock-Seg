import { Component, OnInit } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-banco-galicia',
  templateUrl: './banco-galicia.page.html',
  styleUrls: ['./banco-galicia.page.scss'],
})
export class BancoGaliciaPage implements OnInit {

  urlBancoGalicia: any;
  parametro: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getUrlBancoGalicia();
  }

  private getUrlBancoGalicia() {
    console.log('Galicia');
    this.urlsService.getUrl('bancogalicia')
      .subscribe(parametro => {
        this.urlBancoGalicia = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
      });
  }


}
