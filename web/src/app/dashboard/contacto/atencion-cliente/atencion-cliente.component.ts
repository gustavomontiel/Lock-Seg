import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Contacto } from '../contacto.model';
import { ContactoService } from '../contacto.service';

@Component({
  selector: 'app-atencion-cliente',
  templateUrl: './atencion-cliente.component.html',
  styleUrls: ['./atencion-cliente.component.scss']
})
export class AtencionClienteComponent implements OnInit {

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

    this.contactoService.getContactos('atencion')
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
