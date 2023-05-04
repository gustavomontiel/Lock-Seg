import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivarLoadingAction, DesactivarLoadingAction } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    public http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) { }

  getCategorias() {
    Swal.fire({
      text: 'Buscando Datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/categorias';

    return this.http.get(url).pipe(
      map((resp: any) => {
        Swal.close();
        return resp;
      })
    );
  }

  getCategoriaById(id: string) {
    Swal.fire({
      text: 'Buscando Datos',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/categorias/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        Swal.close();
        return resp;
      })
    );
  }

  updateCategoria(categoria: Categoria|any) {

    if (categoria.id) {

      Swal.fire({
        text: 'Actualizando Datos',
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      this.store.dispatch(new ActivarLoadingAction());

      let url = environment.APIEndpoint + '/categorias';
      url += '/' + categoria.id;

      return this.http.put(url, categoria)
      .pipe(
        map((resp: any) => {
          Swal.close();
          this.store.dispatch(new DesactivarLoadingAction());
          return resp;
        }),
        catchError(err => {
          console.log('Error:', err);
          Swal.close();
          this.store.dispatch(new DesactivarLoadingAction());
          return throwError(err);
        })
      );
    } else {
      console.log('no se puede actualizar un objeto sin id');
    }
  }

  deleteCategoria(categoria: Categoria) {

    Swal.fire({
      text: 'Procesando solicitud',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/categorias/' + categoria.id;
    return this.http.delete(url)
      .pipe(
        map((resp: any) => {
          Swal.close();
          return resp;
        })
      );

  }

  crearPromocion(categoria: Categoria|any) {

    this.store.dispatch(new ActivarLoadingAction());

    Swal.fire({
      text: 'Creando promoción',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = environment.APIEndpoint + '/categorias';

    return this.http.post(url, categoria)
      .pipe(
        map((resp: any) => {
          this.store.dispatch(new DesactivarLoadingAction());
          Swal.close();
          return resp;
        }),
        catchError(err => {
          console.log('error:', err);
          Swal.close();
          this.store.dispatch(new DesactivarLoadingAction());
          return throwError(err);
        })
      );
  }

}
