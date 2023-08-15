import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../services/promociones.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {

  promociones: any;
  promosFiltradas:any;
  promosBuscadas:any;
  promoSeleccionada: any

  isActive: any;
  userName: any;

  public urlImagenes = '';

  categorias: any;
  categoriaSeleccionada : any;

  buscarPromo: any;
  buscar: boolean;

  constructor(
    private promocionesService: PromocionesService,
    private storageService: StorageService,
    private http: HttpClient,
    public alertController: AlertController,
    public router: Router,


  ) { this.categoriaSeleccionada= 'todas';
      this.buscar = false;
    }

  ngOnInit() {
    this.urlImagenes = environment.APIEndpoint;
    this.getPromociones();
    this.getCategorias();
  }

  private getPromociones() {
    this.promocionesService.getPromocionesAPI()
      .subscribe(promos => {
        this.promociones = this.ordenarItems(promos.data);
        this.promosFiltradas = this.ordenarItems(promos.data);
      });
  };

  /* Obtiene las categorias */
  private getCategorias() {
    this.promocionesService.getCategoriasAPI()
      .subscribe(categorias => {
        this.categorias = this.ordenarItems(categorias.data);
      });
  }

  /* obtiene la categoria seleccionada actual y setea el valor nuevo*/
  cambiarCategoria(e) {
    this.categoriaSeleccionada = e.detail.value

    if (this.categoriaSeleccionada != "todas") {
      this.promosFiltradas = this.promociones.filter(promocion => {
        return promocion.categoria.toString() === e.detail.value.toString();
      });
    }else{
      this.getPromociones();
      console.log('no hay filtro de categoria activo');

    }
  }

  /* obtiene un array y ordena */
  ordenarItems(array) {
    let ordered = array.sort(function (a, b) {
      // A va primero que B
      if (a.orden < b.orden)
          return -1;
      // B va primero que A
      else if (a.orden > b.orden)
          return 1;
      // A y B son iguales
      else
          return 0;
  });
  return ordered;
  }


  /* Modifica la variable buscar para activar o desactivar la pantalla de busqueda. y si esta activa, filtra los resultados de todas las promociones segun el query provisto */
  buscarPromocion(query) {
   if (query.detail.value) {
    this.buscar = true
    console.log('Buscador encendido');
    this.promosBuscadas = this.promociones.filter(promocion => {
      return promocion.titulo.toLowerCase().includes(query.detail.value.toLowerCase()) || promocion.descripcion.toLowerCase().includes(query.detail.value.toLowerCase())
    });
  }else {
    this.buscar = false
    console.log('Buscador desactivado');
   }

  }

  /* Navega hasta el componente donde se muestra la promocion en pantalla completa */
  showPromo(promo){
    if (promo) {
      this.router.navigate(['pantalla-completa', promo.id]);
    }
  }

}
