import { AtencionClienteComponent } from './contacto/atencion-cliente/atencion-cliente.component';
import { ServicioTecnicoComponent } from './contacto/servicio-tecnico/servicio-tecnico.component';
import { MovilDomicilioComponent } from './contacto/movil-domicilio/movil-domicilio.component';
import { BotonPanicoComponent } from './boton-panico/boton-panico.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { Routes } from '@angular/router';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './usuario/usuarios/usuarios.component';
import { RoleGuard } from '../shared/guards/role.guard';


export const dashboardRoutes: Routes = [
  { path: '',
    component: UsuariosComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion']
    }
  },
  { path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion', 'operador']
    }
  },
  { path: 'crear-usuario',
    component: CrearUsuarioComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion']
    }
  },
  { path: 'editar-usuarios/:id',
    component: EditarUsuarioComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion']
    }
  },
  { path: 'boton-panico',
    component: BotonPanicoComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['operador']
    }
  },
  { path: 'movil-domicilio',
    component: MovilDomicilioComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion', 'operador']
    }
  },
  { path: 'servicio-tecnico',
    component: ServicioTecnicoComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion', 'operador']
    }
  },
  { path: 'atencion-cliente',
    component: AtencionClienteComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion', 'operador']
    }
  },
];
