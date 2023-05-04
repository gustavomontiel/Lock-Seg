import { PromocionService } from './../promocion.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Promocion } from '../promocion.model';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';


@Component({
  selector: 'app-editar-promocion',
  templateUrl: './editar-promocion.component.html',
  styleUrls: ['./editar-promocion.component.scss']
})
export class EditarPromocionComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  promocion: Promocion;
  formPromocion: FormGroup;
  categorias: Categoria[];


  constructor(
    public router: Router,
    public promocionService: PromocionService,
    public activatedRoute: ActivatedRoute,
    public categoriaService: CategoriaService,
    public store: Store<AppState>,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
      this.leerCategorias();
    });

    this.formPromocion = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      categoria: new FormControl(null, Validators.required),
      orden: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      fecha_desde: new FormControl(null, [Validators.required]),
      fecha_hasta: new FormControl(null, Validators.required),
      /* imagen: new FormControl('', Validators.required), */
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.cargarPromocion(id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  leerCategorias() {
    this.categoriaService.getCategorias()
      .subscribe(categorias => {
        console.log(categorias);
        this.categorias = categorias.data;

      });
  }

  cargarPromocion(id: string) {
    this.promocionService.getPromocionById(id)
      .subscribe(promocion => {
        this.promocion = promocion.data;
        this.formPromocion.setValue({

          titulo: this.promocion.titulo,
          categoria: this.promocion.categoria,
          orden: this.promocion.orden,
          descripcion: this.promocion.descripcion,
          fecha_desde: this.promocion.fecha_desde.toString().substring(0, 10),
          fecha_hasta: this.promocion.fecha_hasta.toString().substring(0, 10),
          /* imagen: this.promocion.imagen */
        });
      });
  }

  actualizarPromocion() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {

        const form  = new FormData();
        form.append('id', this.promocion.id);
        form.append('categoria', this.formPromocion.get('categoria').value);
        form.append('orden', this.formPromocion.get('orden').value);
        form.append('titulo', this.formPromocion.get('titulo').value);
        form.append('descripcion', this.formPromocion.get('descripcion').value);
        form.append('fecha_desde', this.formPromocion.get('fecha_desde').value);
        form.append('fecha_hasta', this.formPromocion.get('fecha_hasta').value);
        form.append(`_method`, 'put');
        /* form.append('imagen', this.formPromocion.get('imagen').value); */

        this.promocionService.updatePromocion(form).subscribe(
          resp => {
            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              type: 'success',
              timer: 2000
            })
            .then(res => {
              console.log(res);
              const url = '/promociones/'
              this.router.navigate([url]);
            });

          },
          err => {
            console.log(err);
            Swal.fire(
              'Error!',
              'Los cambios no fueron guardados.',
              'error'
            );
          }
        );
      }
    });

  }

  onFileChange(event: any, field: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formPromocion.get(field).setValue(file);
    }
    this.cd.markForCheck();

  }

}
