import { PromocionService } from './../promocion.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Promocion } from '../promocion.model';


@Component({
  selector: 'app-crear-promocion',
  templateUrl: './crear-promocion.component.html',
  styleUrls: ['./crear-promocion.component.scss']
})
export class CrearPromocionComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  promocion: Promocion;
  formPromocion: FormGroup;


  constructor(
    public router: Router,
    public promocionService: PromocionService,
    public activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
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
      imagen: new FormControl(null, Validators.required),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  crearPromocion() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {

        const formData = new FormData();
        formData.append('titulo', this.formPromocion.get('titulo').value);
        formData.append('descripcion', this.formPromocion.get('descripcion').value);
        formData.append('fecha_desde', this.formPromocion.get('fecha_desde').value);
        formData.append('fecha_hasta', this.formPromocion.get('fecha_hasta').value);
        formData.append('imagen', this.formPromocion.get('imagen').value);

        this.promocionService.crearPromocion(formData).subscribe(
          resp => {
            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              type: 'success',
              timer: 2000
            }).then(res => {
              console.log(res);
              const url = '/editar-promocion/' + resp.data.id;
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

  onFileChange( event: any, field: any ) {
    const reader = new FileReader();

    if ( event.target.files && event.target.files.length > 0 ) {
      const file = event.target.files[0];
      this.formPromocion.get(field).setValue(file);
    }
    this.cd.markForCheck();

  }

}
