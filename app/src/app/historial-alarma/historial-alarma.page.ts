import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';

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
  ) { }

  ngOnInit() {
    this.getUrlHistorial();
  }

  private getUrlHistorial(){
    console.log('entra en el ts');
    this.urlsService.getUrl('1')
        .subscribe(parametro => {
          this.parametro = parametro;
        });
  }

}
