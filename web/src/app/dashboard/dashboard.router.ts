import { AtencionClienteComponent } from './atencion-cliente/atencion-cliente.component';
import { ServicioTecnicoComponent } from './servicio-tecnico/servicio-tecnico.component';
import { MovilDomicilioComponent } from './movil-domicilio/movil-domicilio.component';
import { BotonPanicoComponent } from './boton-panico/boton-panico.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario.component';
import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


export const dashboardRoutes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'usuarios/:id', component: UsuarioComponent },
  { path: 'boton-panico', component: BotonPanicoComponent },
  { path: 'movil-domicilio', component: MovilDomicilioComponent },
  { path: 'servicio-tecnico', component: ServicioTecnicoComponent },
  { path: 'atencion-cliente', component: AtencionClienteComponent },
];
