import { MensajeService } from './mensaje.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Mensaje } from './mensaje.model';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  mensajes: Mensaje[] = [];
  usuario: User;

  dataSource: any;
  displayedColumns: string[] = ['created_at', 'fecha_entrega', 'mensaje'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public mensajeService: MensajeService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      this.leerMensajes(params.id);

      this.authService.getUsuarioId(params.id)
        .subscribe(usuario => {
          this.usuario = usuario.data;
        });
    });
  }

  leerMensajes(id: number) {

    this.mensajeService.getMensajes(id)
      .subscribe(msgs => {
        this.mensajes = msgs;
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

    if (this.usuario.telefono != null && this.usuario.telefono.toString().length > 0) {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Ingrese un mensaje de hasta 140 caracteres...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      });
      if (text) {
        const msg: Mensaje = {
          user_id: this.usuario.id,
          mensaje: text,
          estado: 'NUEVO'
        }
        this.mensajeService.crearMensaje(msg)
        .subscribe(
          resp => {
            Swal.fire('Mensaje enviado: ' + text);
            this.leerMensajes(this.usuario.id);
          },
          err => {
            Swal.fire('Mensaje NO enviado: ' + text);
          }
        );
      }
    } else {
      Swal.fire(
        'Error!',
        'No se puede enviar mensajes push a clientes sin teléfono.',
        'error'
      );
    }
  }


}
