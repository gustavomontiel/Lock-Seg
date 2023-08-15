import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { LoadingService } from "../services/loading.service";
import { PromocionesService } from "../services/promociones.service";
import { StorageService } from "../services/storage.service";


@Component({
  selector: 'app-pantalla-completa',
  templateUrl: './pantalla-completa.page.html',
  styleUrls: ['./pantalla-completa.page.scss'],
})
export class PantallaCompletaPage implements OnInit {
  selectedPromoID :any;
  selectedPromo :any;
  promos: any;
  datosDisponibles:any;
  isActive: any;
  userName: any;
  public urlImagenes = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private promocionesService: PromocionesService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private http: HttpClient,

  ) {
    this.urlImagenes = environment.APIEndpoint;
    this.datosDisponibles = false;
    console.log('Pantalla Completa');
    activatedRoute.params.subscribe((params) => {
      this.selectedPromoID = params.promoID;
    });
  }

  ngOnInit(): void {
    this.getPromociones();

  }


   getPromociones() {

    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const user_info = typeof response === 'string' ? JSON.parse(response) : response;
        this.userName = user_info.data.user.nombre
        const url = environment.APIEndpoint + "/active-status/" + user_info.data.user.id;
        this.http.get(url).subscribe(resp => {
          const respuesta = typeof resp === 'string' ? JSON.parse(resp) : resp;
          if (respuesta.activo === 1) {
           this.isActive = "Activo"
          }else{
            this.isActive = "Inactivo"
          }
        })
      }
    })

    this.loadingService.present();
    let i = this.promocionesService.getPromocionesAPI().toPromise()
      .then(res => {
        this.findSelectedPromo(res.data)
      })
      .finally(() => {
        this.loadingService.dismiss();
        this.datosDisponibles = true
      })
      ;
  };

  findSelectedPromo(promos: any){
    console.log(promos);
    this.selectedPromo = promos.find(
      (promo) => promo.id.toString() === this.selectedPromoID

    )
  }


}
