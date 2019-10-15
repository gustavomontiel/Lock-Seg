import { PromocionService } from './../promocion.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Promocion } from '../promocion.model';


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

  constructor(
    public router: Router,
    public promocionService: PromocionService,
    public activatedRoute: ActivatedRoute,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });

    this.formPromocion = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      fecha_desde: new FormControl(null, [Validators.required]),
      fecha_hasta: new FormControl(null, Validators.required),
      // imagen: new FormControl('', Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.cargarPromocion(id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cargarPromocion(id: string) {
    this.promocionService.getPromocionById(id)
      .subscribe(promocion => {
        this.promocion = promocion.data;
        console.log(this.promocion);
        this.formPromocion.setValue({
          titulo: this.promocion.titulo,
          descripcion: this.promocion.descripcion,
          fecha_desde: this.promocion.fecha_desde.toString().substring(0, 10),
          fecha_hasta: this.promocion.fecha_hasta.toString().substring(0, 10)
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

        const formData = new FormData();
        formData.append('id', this.promocion.id);
        formData.append('titulo', this.formPromocion.get('titulo').value);
        formData.append('descripcion', this.formPromocion.get('descripcion').value);
        formData.append('fecha_desde', this.formPromocion.get('fecha_desde').value);
        formData.append('fecha_hasta', this.formPromocion.get('fecha_hasta').value);
        // formData.append('imagen', this.formPromocion.get('imagen').value);

        this.promocionService.updatePromocion(formData).subscribe(
          resp => {
            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              type: 'success',
              timer: 2000
            })
            /*
            .then(res => {
              console.log(res);
              const url = '/editar-promocion/' + resp.data.id;
              this.router.navigate([url]);
            });
            */
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



}
