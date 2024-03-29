import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { EditarUsuarioComponent } from './dashboard/usuario/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './dashboard/usuario/usuarios/usuarios.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { MensajesComponent } from './dashboard/usuario/mensaje/mensajes.component';
import { CrearUsuarioComponent } from './dashboard/usuario/crear-usuario/crear-usuario.component';
import { BotonPanicoComponent } from './dashboard/boton-panico/boton-panico.component';
import { MovilDomicilioComponent } from './dashboard/contacto/movil-domicilio/movil-domicilio.component';
import { ServicioTecnicoComponent } from './dashboard/contacto/servicio-tecnico/servicio-tecnico.component';
import { AtencionClienteComponent } from './dashboard/contacto/atencion-cliente/atencion-cliente.component';
import { ParametrosComponent } from './dashboard/parametro/parametros/parametros.component';
import { CrearParametroComponent } from './dashboard/parametro/crear-parametro/crear-parametro.component';
import { EditarParametroComponent } from './dashboard/parametro/editar-parametro/editar-parametro.component';
import { CrearPromocionComponent } from './dashboard/promocion/crear-promocion/crear-promocion.component';
import { EditarPromocionComponent } from './dashboard/promocion/editar-promocion/editar-promocion.component';
import { PromocionesComponent } from './dashboard/promocion/promociones/promociones.component';
import { EliminarUsuarioComponent } from './dashboard/usuario/eliminar-usuario/eliminar-usuario.component';
import { DebitoAutomaticoComponent } from './dashboard/contacto/debito-automatico/debito-automatico.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    EditarUsuarioComponent,
    UsuariosComponent,
    MensajesComponent,
    CrearUsuarioComponent,
    BotonPanicoComponent,
    MovilDomicilioComponent,
    ServicioTecnicoComponent,
    AtencionClienteComponent,
    ParametrosComponent,
    CrearParametroComponent,
    EditarParametroComponent,
    CrearPromocionComponent,
    EditarPromocionComponent,
    PromocionesComponent,
    EliminarUsuarioComponent,
    DebitoAutomaticoComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
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
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
