import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Contacto } from '../contacto/contacto.model';
import { ContactoService } from '../contacto/contacto.service';

@Component({
  selector: 'app-boton-panico',
  templateUrl: './boton-panico.component.html',
  styleUrls: ['./boton-panico.component.scss']
})
export class BotonPanicoComponent implements OnInit {

  contactos: Contacto[];

  dataSource: any;
  displayedColumns: string[] = ['created_at', 'user.codigo_gestion', 'user.nombre', 'titulo', 'descripcion'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private contactoService: ContactoService,
  ) { }

  ngOnInit() {
    this.leerContactos();
  }

  leerContactos() {

    this.contactoService.getContactos('alarma')
      .subscribe(contactos => {
        console.log(contactos);
        this.contactos = contactos;
        this.dataSource = new MatTableDataSource(this.contactos);
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
}
