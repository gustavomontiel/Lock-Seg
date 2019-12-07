import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Contacto } from '../contacto.model';
import { ContactoService } from '../contacto.service';

@Component({
  selector: 'app-movil-domicilio',
  templateUrl: './movil-domicilio.component.html',
  styleUrls: ['./movil-domicilio.component.scss']
})
export class MovilDomicilioComponent implements OnInit {

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

    this.contactoService.getContactos('movil')
      .subscribe(contactos => {
        console.log(contactos);
        const sorted = contactos.sort((a, b) => b.created_at.localeCompare(a.created_at));
        this.contactos = contactos;
        this.dataSource = new MatTableDataSource(this.contactos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.contactos.forEach(contacto => {
          if ( contacto.notificado_el === null ) {
            this.contactoService.notificarContacto( contacto )
            .subscribe(
              res => { console.log(res); },
              err => { console.log(err); }
            );
          }
        });
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
