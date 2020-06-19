import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'facturas', loadChildren: './facturas/facturas.module#FacturasPageModule' },
  { path: 'soporte', loadChildren: './soporte/soporte.module#SoportePageModule' },
  { path: 'promoiones', loadChildren: './promoiones/promoiones.module#PromoionesPageModule' },
  { path: 'pagar-factura', loadChildren: './pagar-factura/pagar-factura.module#PagarFacturaPageModule' },
  { path: 'movil-domicilio', loadChildren: './movil-domicilio/movil-domicilio.module#MovilDomicilioPageModule' },
  { path: 'servicio-tecnico', loadChildren: './servicio-tecnico/servicio-tecnico.module#ServicioTecnicoPageModule' },
  { path: 'atencion-cliente', loadChildren: './atencion-cliente/atencion-cliente.module#AtencionClientePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'historial-alarma', loadChildren: './historial-alarma/historial-alarma.module#HistorialAlarmaPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'debito', loadChildren: './debito/debito.module#DebitoPageModule' },
  { path: 'cambiar-password', loadChildren: './cambiar-pass/cambiar-pass.module#CambiarPassPageModule' },
  { path: 'panico', loadChildren: './modals/panico/panico.module#PanicoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
