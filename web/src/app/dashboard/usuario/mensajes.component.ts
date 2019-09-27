import { MensajeService } from './mensaje.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Mensaje } from './mensaje.model';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  mensajes: Mensaje[] = [];
  dataSource: any;
  displayedColumns: string[] = ['enviado', 'fechaEntrega', 'mensaje'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public mensajeService: MensajeService
  ) { }

  ngOnInit() {
    this.leerMensajes();
  }

  leerMensajes() {
      /*
    this.dataSource = new MatTableDataSource(this.mensajes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  */
    this.mensajeService.getMensajes()
      .subscribe(msgs => {
        console.log(msgs);
        this.mensajes = msgs.body;
        this.dataSource = new MatTableDataSource(this.mensajes);
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

  async enviarMsgPush() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Ingrese un mensaje de hasta 140 caracteres...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })

    if (text) {
      Swal.fire('Mensaje enviado: ' + text);
    }
  }


}
