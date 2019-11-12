import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-historial-alarma',
  templateUrl: './historial-alarma.page.html',
  styleUrls: ['./historial-alarma.page.scss'],
})
export class HistorialAlarmaPage implements OnInit {
  urlHistorial: any;
  parametro: any;

  constructor(
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getUrlHistorial();
  }

  private getUrlHistorial() {
    console.log('entra en el ts');
    this.urlsService.getUrl('historial')
      .subscribe(parametro => {
        this.urlHistorial = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
      });
  }

}
