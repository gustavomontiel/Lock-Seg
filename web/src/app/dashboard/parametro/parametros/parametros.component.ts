import { ParametroService } from './../parametro.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Parametro } from '../parametro.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
export class ParametrosComponent implements OnInit {

  parametros: Parametro[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'descripcion', 'valor', 'mostrar_en', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public parametroService: ParametroService,
    private route: Router
  ) { }

  ngOnInit() {
    this.leerParametros();
  }

  leerParametros() {
    this.parametroService.getParametros()
      .subscribe(parametros => {
        console.log(parametros);
        this.parametros = parametros.data;
        this.dataSource = new MatTableDataSource(this.parametros);
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

  agregarParametro() {
    console.log('nuevo usuario');
    this.route.navigateByUrl('crear-parametro');
  }

  borrarParametro(param: Parametro) {
    Swal.fire({
      title: 'Confirmación?',
      text: 'Confirma eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {

      if (result.value) {
        this.parametroService.deleteParametro(param)
          .subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                'La operación ha sido realizada.',
                'success'
              );
              this.leerParametros();
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
