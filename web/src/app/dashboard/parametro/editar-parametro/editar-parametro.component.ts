import { ParametroService } from './../parametro.service';
import { Parametro } from './../parametro.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-editar-parametro',
  templateUrl: './editar-parametro.component.html',
  styleUrls: ['./editar-parametro.component.scss']
})
export class EditarParametroComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  parametro: Parametro;
  formParametro: FormGroup;

  constructor(
    public router: Router,
    public parametroService: ParametroService,
    public activatedRoute: ActivatedRoute,
    public store: Store<AppState>
  ) { }


  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });

    this.formParametro = new FormGroup({
      descripcion: new FormControl(null, Validators.required),
      valor: new FormControl(null, [Validators.required]),
      mostrar_en: new FormControl('', Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.cargarParametro(id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cargarParametro(id: string) {
    this.parametroService.getParametroById(id)
      .subscribe(parametro => {
        this.parametro = parametro.data;
        console.log(this.parametro);
        this.formParametro.setValue({
          descripcion: this.parametro.descripcion,
          valor: this.parametro.valor,
          mostrar_en: this.parametro.mostrar_en
        });
      });
  }

  actualizarParametro() {

    Swal.fire({
      title: 'Guardar cambios?',
      text: 'Confirma los cambios?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const param = { ... this.formParametro.value, id: this.parametro.id };

        this.parametroService.updateParametro( param ).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los cambios fueron guardados correctamente.',
              'success'
            );
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
