import { Component, OnInit } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-banco-macro',
  templateUrl: './banco-macro.page.html',
  styleUrls: ['./banco-macro.page.scss'],
})
export class BancoMacroPage implements OnInit {

  urlBancoMacro: any;
  parametro: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getUrlBancoMacro();
  }

  private getUrlBancoMacro() {
    console.log('macro');
    this.urlsService.getUrl('bancomacro')
      .subscribe(parametro => {
        this.urlBancoMacro = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
      });
  }

}
