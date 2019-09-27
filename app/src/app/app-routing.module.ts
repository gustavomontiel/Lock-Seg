import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
