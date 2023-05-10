import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { User } from "src/app/auth/user.model";
import { AuthService } from "src/app/auth/auth.service";
import { roleNames } from "src/app/shared/guards/roleNames.data";
import { HttpErrorResponse } from "@angular/common/http";
import { MatPaginator, MatSort, MatTableDataSource, MatSlideToggleModule } from "@angular/material";

@Component({
  selector: "app-editar-usuario",
  templateUrl: "./editar-usuario.component.html",
  styleUrls: ["./editar-usuario.component.scss"],
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {
  cargando: boolean;
  subscription: Subscription;

  usuario: User;
  isChecked: boolean;
  formUsuario: FormGroup;
  roleNames = roleNames;

  formPassword: FormGroup;

  formPannelAccount: FormGroup;
  pannelAccounts: any[] = [];


  dataSource: any;
  displayedColumns: string[] = ['account', 'identificador', 'descripcion', 'marca', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select("ui").subscribe((ui) => {
      this.cargando = ui.isLoading;
    });

    this.formUsuario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefono: new FormControl("", Validators.required),
      roleNames: new FormControl([], [Validators.required]),
      activo: new FormControl([], [Validators.required]),
      codigo_gestion: new FormControl(""),
    });

    this.formPassword = new FormGroup({
      password_nuevo: new FormControl(null, Validators.required),
    });

    this.formPannelAccount = new FormGroup({
      id: new FormControl(null),
      account: new FormControl(null, Validators.required),
      identificador: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      marca: new FormControl(0),
    });

    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.cargarUsuario(id);
      this.getPannelAccounts(id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cargarUsuario(id: string) {
    this.authService.getUsuarioId(id).subscribe((usuario) => {
      this.usuario = usuario.data;
      this.formUsuario.setValue({
        nombre: this.usuario.nombre,
        email: this.usuario.email,
        telefono: this.usuario.telefono,
        roleNames: this.usuario.roleNames ? this.usuario.roleNames : "",
        codigo_gestion: this.usuario.codigo_gestion,
        activo: this.usuario.activo
      });
    });
  }

  getPannelAccounts(userId: string) {
    this.authService.getUserPannelAccounts(userId).subscribe((pannelAccounts) => {
      if (pannelAccounts.error === 'false') {
        this.pannelAccounts = pannelAccounts.data.cuentas;
        this.dataSource = new MatTableDataSource(this.pannelAccounts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  actualizarUsuario() {
    Swal.fire({
      title: "Guardar cambios?",
      text: "Confirma los cambios?",
      type: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        const user = { ...this.formUsuario.value, id: this.usuario.id };

        this.authService.updateUser(user).subscribe(
          (resp) => {
            Swal.fire(
              "Guardado!",
              "Los cambios fueron guardados correctamente.",
              "success"
            );
          },
          (error) => {
            let msg = "";
            if (error instanceof HttpErrorResponse) {
              const validationErrors = error.error.data;
              if (error.status === 422 || error.status === 400) {
                Object.keys(validationErrors).forEach((prop) => {
                  const formControl = this.formUsuario.get(prop);
                  if (formControl) {
                    msg += "<br>" + validationErrors[prop];
                    formControl.setErrors({
                      serverError: validationErrors[prop],
                    });
                  }
                });
              }
            }

            Swal.fire(
              "Error!",
              "Los cambios no fueron guardados." + msg,
              "error"
            );
          }
        );
      }
    });
  }

  actualizarPassword() {
    Swal.fire({
      title: "Combiar contraseña?",
      text: "Confirma el cambio de contraseña?",
      type: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        const pass = this.formPassword.value;

        this.authService.cambiarPassword(this.usuario.id, pass).subscribe(
          (resp) => {
            Swal.fire(
              "Guardado!",
              "La contraseña ha sido actualizada correctamente.",
              "success"
            );
          },
          (error) => {
            let msg = "";
            if (error instanceof HttpErrorResponse) {
              const validationErrors = error.error.data;
              if (error.status === 422 || error.status === 400) {
                Object.keys(validationErrors).forEach((prop) => {
                  const formControl = this.formUsuario.get(prop);
                  if (formControl) {
                    msg += "<br>" + validationErrors[prop];
                    formControl.setErrors({
                      serverError: validationErrors[prop],
                    });
                  }
                });
              }
            }

            Swal.fire(
              "Error!",
              "Los cambios no fueron guardados." + msg,
              "error"
            );
          }
        );
      }
    });
  }

  grabarPannelAccount() {
    Swal.fire({
      title: "Guardar cambios?",
      text: "Confirma los cambios?",
      type: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        const account = this.formPannelAccount.value;
        account.user_id = this.usuario.id;
        if (account.id) {
          this.authService.updateUserPannelAccount(account).subscribe(
            (resp) => {
              Swal.fire(
                "Guardado!",
                "Datos actualizados correctamente.",
                "success"
              ).then(
                res => {
                  this.setFormPannelAccount(null, null, null, null, 0);
                  this.getPannelAccounts(this.usuario.id.toString());
                }
              )
            },
            (error) => {
              let msg = "";
              if (error instanceof HttpErrorResponse) {
                const validationErrors = error.error.data;
                if (error.status === 422 || error.status === 400) {
                  Object.keys(validationErrors).forEach((prop) => {
                    const formControl = this.formPannelAccount.get(prop);
                    if (formControl) {
                      msg += "<br>" + validationErrors[prop];
                      formControl.setErrors({
                        serverError: validationErrors[prop],
                      });
                    }
                  });
                }
              }
              Swal.fire(
                "Error!",
                "Los cambios no fueron guardados." + msg,
                "error"
              );
            }
          )
        } else {
          this.authService.createUserPannelAccount(account).subscribe(
            (resp) => {
              Swal.fire(
                "Guardado!",
                "Datos actualizados correctamente.",
                "success"
              ).then(
                res => {
                  this.setFormPannelAccount(null, null, null, null, 0);
                  this.getPannelAccounts(this.usuario.id.toString());
                }
              )
            },
            (error) => {
              let msg = "";
              if (error instanceof HttpErrorResponse) {
                const validationErrors = error.error.data;
                if (error.status === 422 || error.status === 400) {
                  Object.keys(validationErrors).forEach((prop) => {
                    const formControl = this.formPannelAccount.get(prop);
                    if (formControl) {
                      msg += "<br>" + validationErrors[prop];
                      formControl.setErrors({
                        serverError: validationErrors[prop],
                      });
                    }
                  });
                }
              }
              Swal.fire(
                "Error!",
                "Los cambios no fueron guardados." + msg,
                "error"
              );
            }
          )
        }
      }
    });
  }

  cancelarFormPannelAccount() {
    this.setFormPannelAccount(null, null, null, null, 0);
    this.formPannelAccount.markAsPristine();
  }

  setFormPannelAccount(id, account, identificador, descripcion, marca) {
    marca = marca == '' || marca == null ? 0 : marca;
    this.formPannelAccount.setValue({ id: id, account: account, identificador: identificador, descripcion: descripcion, marca: marca });
  }

  editarFormPannelAccount(account) {
    this.setFormPannelAccount(account.id, account.account, account.identificador, account.descripcion, account.marca);
    this.formPannelAccount.markAsDirty();
  }

  eliminarFormPannelAccount(account) {
    const msg = 'Confirma eliminar el registro: "' + account.descripcion + '"?';
    Swal.fire({
      title: "Guardar cambios?",
      text: msg,
      type: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.authService.deleteUserPannelAccount(account.id).subscribe(
          (resp) => {
            Swal.fire(
              "Guardado!",
              "Datos eliminado correctamente.",
              "success"
            ).then(
              res => {
                this.getPannelAccounts(this.usuario.id.toString());
              }
            )
          },
          (error) => {
            let msg = "";
            if (error instanceof HttpErrorResponse) {
              const validationErrors = error.error.data;
              if (error.status === 422 || error.status === 400) {
                Object.keys(validationErrors).forEach((prop) => {
                  const formControl = this.formPannelAccount.get(prop);
                  if (formControl) {
                    msg += "<br>" + validationErrors[prop];
                    formControl.setErrors({
                      serverError: validationErrors[prop],
                    });
                  }
                });
              }
            }
            Swal.fire(
              "Error!",
              "Los cambios no fueron guardados." + msg,
              "error"
            );
          }
        )
      }
    })
  }

}
