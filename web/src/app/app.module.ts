import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppReducers } from './app.reducer';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { environment } from 'src/environments/environment';
import { UsuarioComponent } from './dashboard/usuario/usuario.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { MensajesComponent } from './dashboard/usuario/mensajes.component';
import { CrearUsuarioComponent } from './dashboard/usuario/crear-usuario.component';
import { BotonPanicoComponent } from './dashboard/boton-panico/boton-panico.component';
import { MovilDomicilioComponent } from './dashboard/movil-domicilio/movil-domicilio.component';
import { ServicioTecnicoComponent } from './dashboard/servicio-tecnico/servicio-tecnico.component';
import { AtencionClienteComponent } from './dashboard/atencion-cliente/atencion-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    UsuarioComponent,
    UsuariosComponent,
    MensajesComponent,
    CrearUsuarioComponent,
    BotonPanicoComponent,
    MovilDomicilioComponent,
    ServicioTecnicoComponent,
    AtencionClienteComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'ingreso-egreso-app'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( AppReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    })

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
