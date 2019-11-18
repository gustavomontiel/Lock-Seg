import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Contacto } from '../contacto/contacto.model';
import { ContactoService } from '../contacto/contacto.service';
import { BotonPanicoService } from './boton-panico.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-boton-panico',
  templateUrl: './boton-panico.component.html',
  styleUrls: ['./boton-panico.component.scss']
})
export class BotonPanicoComponent implements OnInit, OnDestroy {

  contactos: Contacto[];
  activarAlarma = false;
  private subscription: Subscription;
  tituloAnt: string;

  dataSource: any;
  displayedColumns: string[] = ['created_at', 'user.codigo_gestion', 'user.nombre', 'titulo', 'updated_at'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private contactoService: ContactoService,
    private botonPanicoService: BotonPanicoService,
    private titleService: Title
  ) { }

  ngOnInit() {

    this.tituloAnt = this.titleService.getTitle();
    this.leerContactos();

    this.botonPanicoService.activarGuardia();
    this.subscription = this.botonPanicoService.contactoAlarmaObs.subscribe((contacto) => {
      if (contacto) {
        this.botonPanicoService.cancelarPanico(contacto);
        this.titleService.setTitle( this.tituloAnt + ' - ALARMA!');
        this.activarAlarma = true;
        this.leerContactos();
      } else {
        this.titleService.setTitle( this.tituloAnt);
        this.activarAlarma = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  leerContactos() {

    this.contactoService.getContactos('panico')
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

  pararAlarma() {
    Swal.fire({
      title: 'Confirmación?',
      text: 'Desea detener la reproducción del sonido?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.activarAlarma = false;
      }
    });
  }


}
