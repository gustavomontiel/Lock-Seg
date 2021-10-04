import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../services/promociones.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {
  
  promociones: any;
  promos: any;
  public urlImagenes = '';

  constructor(
    private promocionesService: PromocionesService,

  ) { }

  ngOnInit() {
    this.urlImagenes = environment.APIEndpoint;
    this.getPromociones();
  }

  private getPromociones() {
    this.promocionesService.getPromocionesAPI()
      .subscribe(promos => {
        this.promociones = promos.data;
      });
  }

}
