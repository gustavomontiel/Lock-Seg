import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './services/token.interceptor';
import { SharedModule } from './shared/shared.module';

import { HomePage } from './home/home.page';
import { FacturasPage } from './facturas/facturas.page';
import { SoportePage } from './soporte/soporte.page';
import { PromocionesPage } from './promociones/promociones.page';
import { PagarFacturaPage } from './pagar-factura/pagar-factura.page';
import { MovilDomicilioPage } from './movil-domicilio/movil-domicilio.page';
import { ServicioTecnicoPage } from './servicio-tecnico/servicio-tecnico.page';
import { AtencionClientePage } from './atencion-cliente/atencion-cliente.page';
import { LoginPage } from './login/login.page';
import { ChatPage } from './chat/chat.page';
import { DebitoPage } from './debito/debito.page';
import { CambiarPassPage } from './cambiar-pass/cambiar-pass.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';
import { AuthGuard } from './services/auth-guard.service';
import { LoadingInterceptor } from './services/loading.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { HTTP } from '@ionic-native/http/ngx';
import { PantallaCompletaPage } from './pantalla-completa/pantalla-completa.page';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    FacturasPage,
    SoportePage,
    PromocionesPage,
    PagarFacturaPage,
    MovilDomicilioPage,
    ServicioTecnicoPage,
    AtencionClientePage,
    LoginPage,
    ChatPage,
    DebitoPage,
    CambiarPassPage
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    HTTP,
    // NativeStorage,
    SignInWithApple,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
