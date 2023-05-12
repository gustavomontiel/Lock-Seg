import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { Promocion } from '../promocion.model';
import { PromocionService } from '../promocion.service';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {

  formCategoriaNueva: FormGroup;

  promociones: Promocion[];
  categorias: Categoria[];
  dataSource: any;
  catList: any;
  displayedColumns: string[] = ['id','titulo', 'categoria','orden', 'fecha_desde', 'fecha_hasta', 'acciones'];
  displayedColumns2: string[] = ['id','orden', 'titulo', 'descripcion', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public promocionService: PromocionService,
    public categoriaService: CategoriaService,
    private route: Router
  ) { }

  ngOnInit() {
    this.leerPromociones();
    this.leerCategorias();

    this.formCategoriaNueva = new FormGroup({
      id: new FormControl(null),
      orden: new FormControl(null, Validators.required),
      titulo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
    });

  }

  leerPromociones() {
    this.promocionService.getPromociones()
      .subscribe(promociones => {
        console.log(promociones);
        this.promociones = promociones.data;
        this.dataSource = new MatTableDataSource(this.promociones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  leerCategorias() {
    this.categoriaService.getCategorias()
      .subscribe(categorias => {
        console.log(categorias);
        this.categorias = categorias.data;
        this.catList = new MatTableDataSource(this.categorias);
        this.catList.paginator = this.paginator;
        this.catList.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  agregarCategoria() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const categoria = this.formCategoriaNueva.value;
        if (categoria.id) {
          this.categoriaService.updateCategoria(categoria).subscribe(
            (resp) => {
              Swal.fire(
                "Guardado!",
                "Datos actualizados correctamente.",
                "success"
              ).then(
                res => {
                  this.setCategoria(null, null, null, null);
                  this.leerCategorias();
                }
              )
            },
            (error) => {
              let msg = "";
              if (error instanceof HttpErrorResponse) {
                const validationErrors = error.error.data;
                if (error.status === 422 || error.status === 400) {
                  Object.keys(validationErrors).forEach((prop) => {
                    const formControl = this.formCategoriaNueva.get(prop);
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
      }else {
          const categoria = { ... this.formCategoriaNueva.value };
          this.categoriaService.crearPromocion(categoria).subscribe(
            resp => {
              Swal.fire({
                title: 'Guardado!',
                html: 'Los datos fueron guardados correctamente.',
                type: 'success',
                timer: 2000
              });
              this.leerCategorias();
              this.setCategoria(null, null, null, null);
            },
            error => {
              let msg = '';
              if (error instanceof HttpErrorResponse) {
                const validationErrors = error.error.data;
                if ( error.status === 422 || error.status === 400) {
                  Object.keys(validationErrors).forEach(prop => {
                    const formControl = this.formCategoriaNueva.get(prop);
                    if (formControl) {
                      msg += '<br>' + validationErrors[prop];
                      formControl.setErrors({
                        serverError: validationErrors[prop]
                      });
                    }
                  });
                }
              }

              Swal.fire(
                'Error!',
                'Los cambios no fueron guardados.' + msg,
                'error'
              );

            }
          );
        }

        }
    });

  }

  agregarPromocion() {
    this.route.navigateByUrl('crear-promocion');
  }

  borrarParametro(promocion: Promocion) {
    Swal.fire({
      title: 'Confirmación?',
      text: 'Confirma eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {

      if (result.value) {
        this.promocionService.deletePromocion(promocion)
          .subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                'La operación ha sido realizada.',
                'success'
              );
              this.leerPromociones();
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

  borrarCategoria(categoria: Categoria) {
    Swal.fire({
      title: 'Confirmación?',
      text: 'Confirma eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {

      if (result.value) {
        this.categoriaService.deleteCategoria(categoria)
          .subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                'La operación ha sido realizada.',
                'success'
              );
              this.leerCategorias();
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

  actualizarCategoria() {
    Swal.fire({
      title: "Guardar cambios?",
      text: "Confirma los cambios?",
      type: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        const categoria = { ...this.formCategoriaNueva.value };

        this.categoriaService.updateCategoria(categoria).subscribe(
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
                  const formControl = this.formCategoriaNueva.get(prop);
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

  cancelarCategoria() {
    this.setCategoria(null, null, null, null);
    this.formCategoriaNueva.markAsPristine();
  }

  setCategoria(id,orden, titulo, descripcion) {
    this.formCategoriaNueva.setValue({ id: id, orden:orden, titulo:titulo, descripcion: descripcion});
  }

  editarCategoria(account) {
    this.setCategoria(account.id, account.orden , account.titulo, account.descripcion, );
    this.formCategoriaNueva.markAsDirty();
  }

  findCategoryName(id){
    console.log(id);

    const cat = this.categorias.find(cate =>cate.id == id)
    console.log(cat);

    return cat.titulo
  }

}
