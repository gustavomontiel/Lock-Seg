import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './services/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { HomePage } from './home/home.page';
import { FacturasPage } from './facturas/facturas.page';
import { SoportePage } from './soporte/soporte.page';
import { PromoionesPage } from './promoiones/promoiones.page';
import { PagarFacturaPage } from './pagar-factura/pagar-factura.page';
import { MovilDomicilioPage } from './movil-domicilio/movil-domicilio.page';
import { ServicioTecnicoPage } from './servicio-tecnico/servicio-tecnico.page';
import { AtencionClientePage } from './atencion-cliente/atencion-cliente.page';
import { LoginPage } from './login/login.page';
import { HistorialAlarmaPage } from './historial-alarma/historial-alarma.page';
import { ChatPage } from './chat/chat.page';
import { DebitoPage } from './debito/debito.page';
import { CambiarPassPage } from './cambiar-pass/cambiar-pass.page';
import { PanicoPage } from './modals/panico/panico.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    FacturasPage,
    SoportePage,
    PromoionesPage,
    PagarFacturaPage,
    MovilDomicilioPage,
    ServicioTecnicoPage,
    AtencionClientePage,
    LoginPage,
    HistorialAlarmaPage,
    ChatPage,
    DebitoPage,
    CambiarPassPage,
    PanicoPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    SharedModule
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
