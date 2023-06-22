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
  promosFiltradas:any;

  public urlImagenes = '';

  categorias: any;
  categoriaSeleccionada : any;

  buscarPromo: any;
  buscar: boolean;

  constructor(
    private promocionesService: PromocionesService,

  ) { this.categoriaSeleccionada= 'todas';
      this.buscar = false
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
        console.log(this.promociones);

      });
  };

  /* Obtiene las categorias */
  private getCategorias() {
    this.promocionesService.getCategoriasAPI()
      .subscribe(categorias => {
        this.categorias = this.ordenarItems(categorias.data);
        console.log(this.categorias);
      });

  }

  /* obtiene la categoria seleccionada actual y setea el valor nuevo*/
  handleChange(e) {
    this.categoriaSeleccionada = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);
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

  console.log(ordered);
  return ordered;
  }


  /* Modifica la variable buscar para activar o desactivar la pantalla de busqueda. y si esta activa, filtra los resultados de todas las promociones segun el query provisto */
  buscarPromocion(query) {
   if (query.detail.value) {
    this.buscar = true
    console.log('Buscador encendido');

    this.promosFiltradas = this.promociones.filter(promocion => {
      return promocion.titulo.toLowerCase().includes(query.detail.value.toLowerCase()) || promocion.descripcion.toLowerCase().includes(query.detail.value.toLowerCase())
    });
    console.log( this.promosFiltradas );

  }else {
    this.buscar = false
    console.log('Buscador desactivado');
   }

  }


}
