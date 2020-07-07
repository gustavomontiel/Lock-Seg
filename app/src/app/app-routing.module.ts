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
import { HistorialAlarmaPage } from './historial-alarma/historial-alarma.page';
import { ChatPage } from './chat/chat.page';
import { DebitoPage } from './debito/debito.page';
import { CambiarPassPage } from './cambiar-pass/cambiar-pass.page';
import { PanicoPage } from './modals/panico/panico.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', component: AppComponent, pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', component: HomePage },
  // { path: 'facturas', loadChildren: './facturas/facturas.module#FacturasPageModule' },
  { path: 'facturas', component: FacturasPage },
  // { path: 'soporte', loadChildren: './soporte/soporte.module#SoportePageModule' },
  { path: 'soporte', component: SoportePage },
  // { path: 'promoiones', loadChildren: './promoiones/promoiones.module#PromoionesPageModule' },
  { path: 'promoiones', component: PromoionesPage },
  // { path: 'pagar-factura', loadChildren: './pagar-factura/pagar-factura.module#PagarFacturaPageModule' },
  { path: 'pagar-factura', component: PagarFacturaPage },
  // { path: 'movil-domicilio', loadChildren: './movil-domicilio/movil-domicilio.module#MovilDomicilioPageModule' },
  { path: 'movil-domicilio', component: MovilDomicilioPage },
  // { path: 'servicio-tecnico', loadChildren: './servicio-tecnico/servicio-tecnico.module#ServicioTecnicoPageModule' },
  { path: 'servicio-tecnico', component: ServicioTecnicoPage },
  // { path: 'atencion-cliente', loadChildren: './atencion-cliente/atencion-cliente.module#AtencionClientePageModule' },
  { path: 'atencion-cliente', component: AtencionClientePage },
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login', component: LoginPage },
  // { path: 'historial-alarma', loadChildren: './historial-alarma/historial-alarma.module#HistorialAlarmaPageModule' },
  { path: 'historial-alarma', component: HistorialAlarmaPage },
  // { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'chat', component: ChatPage },
  // { path: 'debito', loadChildren: './debito/debito.module#DebitoPageModule' },
  { path: 'debito', component: DebitoPage },
  // { path: 'cambiar-password', loadChildren: './cambiar-pass/cambiar-pass.module#CambiarPassPageModule' },
  { path: 'cambiar-password', component: CambiarPassPage },
  // { path: 'panico', loadChildren: './modals/panico/panico.module#PanicoPageModule' },
  { path: 'panico', component: PanicoPage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
