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
    const urlParametro = this.urlsService.getParametro('bancomacro');
    this.urlBancoMacro = this.sanitizer.bypassSecurityTrustResourceUrl(urlParametro);
  }

}
