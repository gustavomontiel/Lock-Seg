import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-alarma',
  templateUrl: './historial-alarma.page.html',
  styleUrls: ['./historial-alarma.page.scss'],
})
export class HistorialAlarmaPage implements OnInit {
  urlHistorial: any;
  parametro: any;
  loading: any;

  constructor(
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    // this.getUrlHistorial();
    this.verAlarma();
  }

  verAlarma() {
    const url = this.urlsService.getParametro('historial');
    const browser = this.iab.create(url, '_self', { location:'yes', footer: 'yes' });
    browser.close();
    this.router.navigate(['home']);
  }


   private async getUrlHistorial() {
    const urlParametro = this.urlsService.getParametro('historial');
    this.urlHistorial = this.sanitizer.bypassSecurityTrustResourceUrl(urlParametro);
  }

}
