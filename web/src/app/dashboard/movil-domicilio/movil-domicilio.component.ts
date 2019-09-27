import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacto } from '../contacto.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-movil-domicilio',
  templateUrl: './movil-domicilio.component.html',
  styleUrls: ['./movil-domicilio.component.scss']
})
export class MovilDomicilioComponent implements OnInit {

  usuarios: Contacto[] = [{
    id: '2',
    tipo: 'alarma',
    titulo: 'Móvil en el domicilio',
    descripcion: null,
    user_id: 2
  }];

  dataSource: any;
  displayedColumns: string[] = ['id', 'user_id', 'titulo', 'descripcion', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.leerContactos();
  }

  leerContactos() {

    this.dataSource = new MatTableDataSource(this.usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /*
    this.authService.getUsuarios()
      .subscribe(usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios.data;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      */
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }



}
