import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginadminComponent } from './components/admin/views/loginadmin/loginadmin/loginadmin.component';
import { DashboardMainComponent } from './components/admin/views/dashboard/dashboard-main/dashboard-main.component';
import { authGuard } from './guards/admin/auth.guard';
import { ListaEmpresasComponent } from './components/admin/views/dashboard/dcomponents/lista-empresas/lista-empresas.component';
import { ListaUsuariosComponent } from './components/admin/views/dashboard/usercomponents/lista-usuarios/lista-usuarios.component';
import { DashboardUserComponent } from './components/user/dashboard/dcomponents/dashboard-user/dashboard-user.component';
import { authUserGuard } from './guards/user/auth-user.guard';
import { ListaSalasComponent } from './components/user/dashboard/salacomponents/lista-salas/lista-salas.component';
import { ListaClienteComponent } from './components/user/dashboard/dcomponents/clientecomponents/lista-cliente/lista-cliente.component';

const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: 'login', component: LoginadminComponent },
  { path: 'dashboard', component: DashboardMainComponent, canActivate: [authGuard],
    children: [
      { path: 'EmpresasList', component: ListaEmpresasComponent },
      { path: 'UsuariosList', component: ListaUsuariosComponent },

      /*
      { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'reporteria', loadChildren: () => import('./reporteria/reporteria.module').then(m => m.ReporteriaModule) }
    */
    ]
   }, 
   
   {
    path: 'dashboard-user', component: DashboardUserComponent, canActivate: [authUserGuard],
    children: [
      { path: 'SalasList', component: ListaSalasComponent},
      { path: 'ClientesList', component: ListaClienteComponent}
    ]
   }// Ruta protegida
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
