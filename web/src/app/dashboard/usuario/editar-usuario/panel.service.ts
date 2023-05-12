import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { map, catchError, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Subscription, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "src/app/auth/user.model";
import { AppState } from "src/app/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(
    public http: HttpClient,
    private router: Router,
  ) { }

  getPanelBrands() {

    const url = environment.APIEndpoint + "/paneles";

    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log("resp serv:", resp);
        return resp;
      }),
      catchError((err) => {
        console.log("error serv:", err);
        return throwError(err);
      })
    );
  }
}
