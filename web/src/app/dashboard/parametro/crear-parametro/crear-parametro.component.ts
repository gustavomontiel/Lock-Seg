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
  selector: 'app-crear-parametro',
  templateUrl: './crear-parametro.component.html',
  styleUrls: ['./crear-parametro.component.scss']
})
export class CrearParametroComponent implements OnInit, OnDestroy {

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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  crearParametro() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const parametro = { ... this.formParametro.value };
        console.log(parametro);

        this.parametroService.crearParametro(parametro).subscribe(
          resp => {
            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              type: 'success',
              timer: 2000
            }).then(res => {
              const url = '/editar-parametro/' + resp.data.id;
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

}
