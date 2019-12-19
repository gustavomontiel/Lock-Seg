import { Component, OnInit } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { PromocionesService } from '../services/promociones.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-promoiones',
  templateUrl: './promoiones.page.html',
  styleUrls: ['./promoiones.page.scss'],
})
export class PromoionesPage implements OnInit {

  
  promociones: any;
  promos: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private promocionesService: PromocionesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getPromociones();
  }

  private getPromociones() {
    console.log('promociones');
    this.promocionesService.getPromocionesAPI()
      .subscribe(promos => {
        this.promociones = promos.data;
        console.log(this.promociones);

      });
    
  }

}
