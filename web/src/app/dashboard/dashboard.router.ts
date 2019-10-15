import { EditarParametroComponent } from './parametro/editar-parametro/editar-parametro.component';
import { AtencionClienteComponent } from './contacto/atencion-cliente/atencion-cliente.component';
import { ServicioTecnicoComponent } from './contacto/servicio-tecnico/servicio-tecnico.component';
import { MovilDomicilioComponent } from './contacto/movil-domicilio/movil-domicilio.component';
import { BotonPanicoComponent } from './boton-panico/boton-panico.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { Routes } from '@angular/router';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './usuario/usuarios/usuarios.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { ParametrosComponent } from './parametro/parametros/parametros.component';
import { CrearParametroComponent } from './parametro/crear-parametro/crear-parametro.component';
import { PromocionesComponent } from './promocion/promociones/promociones.component';
import { CrearPromocionComponent } from './promocion/crear-promocion/crear-promocion.component';
import { EditarPromocionComponent } from './promocion/editar-promocion/editar-promocion.component';


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
  { path: 'editar-usuario/:id',
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
  { path: 'parametros',
    component: ParametrosComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administrador']
    }
  },
  { path: 'crear-parametro',
    component: CrearParametroComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administrador']
    }
  },
  { path: 'editar-parametro/:id',
    component: EditarParametroComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administrador']
    }
  },
  { path: 'promociones',
    component: PromocionesComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion']
    }
  },
  { path: 'crear-promocion',
    component: CrearPromocionComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion']
    }
  },
  { path: 'editar-promocion/:id',
    component: EditarPromocionComponent,
    canActivate: [RoleGuard],
    data: {
      rolesPermitidos: ['administracion']
    }
  }
];
