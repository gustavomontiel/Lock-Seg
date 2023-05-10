import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: User[];
  dataSource: any;
  displayedColumns: string[] = ['codigo_gestion','activo', 'nombre', 'email', 'rolenames', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    this.leerUsuarios();
  }

  leerUsuarios() {
    this.authService.getUsuarios()
      .subscribe(usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios.data;
        this.dataSource = new MatTableDataSource(this.usuarios);
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

  agregarUsuario() {
    console.log('nuevo usuario');
    this.route.navigateByUrl('crear-usuario');
  }

  borrarUsuario(user: User) {
    Swal.fire({
      title: 'Confirmación?',
      text: 'Confirma eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {

      if (result.value) {
        this.authService.deleteUser(user)
          .subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                'La operación ha sido realizada.',
                'success'
              );
              this.leerUsuarios();
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
