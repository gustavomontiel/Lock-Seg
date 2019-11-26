import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'mi-alarma', loadChildren: './mi-alarma/mi-alarma.module#MiAlarmaPageModule' },
  { path: 'camaras', loadChildren: './camaras/camaras.module#CamarasPageModule' },
  { path: 'gps', loadChildren: './gps/gps.module#GpsPageModule' },
  { path: 'facturas', loadChildren: './facturas/facturas.module#FacturasPageModule' },
  { path: 'soporte', loadChildren: './soporte/soporte.module#SoportePageModule' },
  { path: 'promoiones', loadChildren: './promoiones/promoiones.module#PromoionesPageModule' },
  { path: 'pagar-factura', loadChildren: './pagar-factura/pagar-factura.module#PagarFacturaPageModule' },
  { path: 'movil-domicilio', loadChildren: './movil-domicilio/movil-domicilio.module#MovilDomicilioPageModule' },
  { path: 'servicio-tecnico', loadChildren: './servicio-tecnico/servicio-tecnico.module#ServicioTecnicoPageModule' },
  { path: 'atencion-cliente', loadChildren: './atencion-cliente/atencion-cliente.module#AtencionClientePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },  { path: 'ver-factura', loadChildren: './ver-factura/ver-factura.module#VerFacturaPageModule' },
  { path: 'pagomiscuentas', loadChildren: './pagomiscuentas/pagomiscuentas.module#PagomiscuentasPageModule' },
  { path: 'rapipago', loadChildren: './rapipago/rapipago.module#RapipagoPageModule' },
  { path: 'pagofacil', loadChildren: './pagofacil/pagofacil.module#PagofacilPageModule' },
  { path: 'banco-macro', loadChildren: './banco-macro/banco-macro.module#BancoMacroPageModule' },
  { path: 'oprerar-alarma', loadChildren: './oprerar-alarma/oprerar-alarma.module#OprerarAlarmaPageModule' },
  { path: 'historial-alarma', loadChildren: './historial-alarma/historial-alarma.module#HistorialAlarmaPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'banco-galicia', loadChildren: './banco-galicia/banco-galicia.module#BancoGaliciaPageModule' },
  { path: 'banco-bbva', loadChildren: './banco-bbva/banco-bbva.module#BancoBbvaPageModule' },
  { path: 'debito', loadChildren: './debito/debito.module#DebitoPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
