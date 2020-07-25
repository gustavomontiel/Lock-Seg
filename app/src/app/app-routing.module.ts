import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
import { FacturasPage } from './facturas/facturas.page';
import { SoportePage } from './soporte/soporte.page';
import { PromoionesPage } from './promoiones/promoiones.page';
import { PagarFacturaPage } from './pagar-factura/pagar-factura.page';
import { MovilDomicilioPage } from './movil-domicilio/movil-domicilio.page';
import { ServicioTecnicoPage } from './servicio-tecnico/servicio-tecnico.page';
import { AtencionClientePage } from './atencion-cliente/atencion-cliente.page';
import { LoginPage } from './login/login.page';
import { ChatPage } from './chat/chat.page';
import { DebitoPage } from './debito/debito.page';
import { CambiarPassPage } from './cambiar-pass/cambiar-pass.page';

const routes: Routes = [

  { path: 'home', component: HomePage },
  { path: 'facturas', component: FacturasPage },
  { path: 'pagar-factura', component: PagarFacturaPage },
  { path: 'debito', component: DebitoPage },
  { path: 'soporte', component: SoportePage },
  { path: 'chat', component: ChatPage },
  { path: 'movil-domicilio', component: MovilDomicilioPage },
  { path: 'servicio-tecnico', component: ServicioTecnicoPage },
  { path: 'atencion-cliente', component: AtencionClientePage },
  { path: 'promoiones', component: PromoionesPage },
  { path: 'login', component: LoginPage },
  { path: 'cambiar-password', component: CambiarPassPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
