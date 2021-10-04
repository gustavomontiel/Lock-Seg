import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { BehaviorSubject, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authState = new BehaviorSubject(false);
  usuario: any;
  constructor(
    private router: Router,
    private storageService: StorageService,
    private platform: Platform,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.isLoggedIn();
    });
  }

  isLoggedIn() {
    this.storageService.get("USER_INFO").then((response) => {
      
      if (response) {
        
        if (response === '[object Object]') {
          this.logout();
        } else {
          this.usuario = (typeof response) === 'string' ? JSON.parse(response) : response;
          if (this.usuario && this.usuario.data && this.usuario.data.token) {
            this.authState.next(true);
          } else {
            this.logout();
          }
        }

      } else {
        this.authState.next(false);
      }
      
    });
  }

  loginUsuario(username: string, password: string) {
    const usuario = {
      email: username,
      password,
    };

    const url = environment.APIEndpoint + "/auth/login";

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.usuario = resp;
        const user_info = typeof resp === 'object' ? JSON.stringify(resp) : resp;
        this.storageService.set("USER_INFO", user_info).then((response) => {
          this.storageService.set("EMAIL", resp.data.user.email).then((email) => {
            this.authState.next(true);
            this.router.navigate(["home"]);
            return email;
          });
        });
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  loginEmail(email: string) {
    const usuario = {
      email: email
    };

    const url = environment.APIEndpoint + "/auth/login-email";

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.usuario = resp;
        const user_info = typeof resp === 'object' ? JSON.stringify(resp) : resp;
        this.storageService.set("USER_INFO", user_info).then((response) => {
          this.storageService.set("EMAIL", resp.data.user.email).then((email) => {
            this.authState.next(true);
            this.router.navigate(["home"]);
            return email;
          });
        });
      }),
      catchError((err) => {
        console.log("error", err);
        return throwError(err);
      })
    );
  }


  logout() {
    this.storageService.remove("USER_INFO").then(() => {
      this.usuario = null;
      this.authState.next(false);
      this.router.navigate(["login"]);
    });
  }

  cambiarPass(password: string, passwordNuevo: string) {
    const usuario = {
      password,
      password_nuevo: passwordNuevo,
    };

    const url = environment.APIEndpoint + "/actualizar-password";

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        this.storageService.set("USER_INFO", resp).then((response) => {
          this.usuario = response;
          this.router.navigate(["home"]);
          this.authState.next(true);
          return response;
        });
      }),
      catchError((err) => {
        console.log("error", err);
        return throwError(err);
      })
    );
  }
}
