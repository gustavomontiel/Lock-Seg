import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { Promocion } from '../promocion.model';
import { PromocionService } from '../promocion.service';


@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {

  promociones: Promocion[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'titulo', 'fecha_desde', 'fecha_hasta', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public promocionService: PromocionService,
    private route: Router
  ) { }

  ngOnInit() {
    this.leerPromociones();
  }

  leerPromociones() {
    this.promocionService.getPromociones()
      .subscribe(promociones => {
        console.log(promociones);
        this.promociones = promociones.data;
        this.dataSource = new MatTableDataSource(this.promociones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  agregarPromocion() {
    this.route.navigateByUrl('crear-promocion');
  }

  borrarParametro(promocion: Promocion) {
    Swal.fire({
      title: 'Confirmación?',
      text: 'Confirma eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {

      if (result.value) {
        this.promocionService.deletePromocion(promocion)
          .subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                'La operación ha sido realizada.',
                'success'
              );
              this.leerPromociones();
            },
            err => {
              Swal.fire(
                'Error!',
                'La operación no pudo realizarse.',
                'error'
              );
            }
          );
      }
    });
  }

}
