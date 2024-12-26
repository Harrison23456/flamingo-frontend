import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginadminComponent } from './components/admin/views/loginadmin/loginadmin/loginadmin.component';
import { DashboardMainComponent } from './components/admin/views/dashboard/dashboard-main/dashboard-main.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { _MatInternalFormField } from '@angular/material/core';
import { MatCommonModule } from '@angular/material/core';
// Importar módulos de Angular Material
import { matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Si usas iconos
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule,
import { MatToolbarModule } from '@angular/material/toolbar';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { CrearEmpresaComponent } from './components/admin/views/dashboard/dcomponents/crear-empresa/crear-empresa.component';
import { ListaEmpresasComponent } from './components/admin/views/dashboard/dcomponents/lista-empresas/lista-empresas.component';
import { EditarEmpresaComponent } from './components/admin/views/dashboard/dcomponents/editar-empresa/editar-empresa.component';
import { EliminarEmpresaComponent } from './components/admin/views/dashboard/dcomponents/eliminar-empresa/eliminar-empresa.component';
import { MatTable } from '@angular/material/table';
import { MatRow } from '@angular/material/table';
import { MatCell } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmtoggleComponent } from './components/admin/views/dashboard/utils/confirmtoggle/confirmtoggle.component';
import { ListaUsuariosComponent } from './components/admin/views/dashboard/usercomponents/lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './components/admin/views/dashboard/usercomponents/crear-usuario/crear-usuario.component';
import { DashboardUserComponent } from './components/user/dashboard/dcomponents/dashboard-user/dashboard-user.component';
import { CrearSalaComponent } from './components/user/dashboard/salacomponents/crear-sala/crear-sala.component';
import { ListaSalasComponent } from './components/user/dashboard/salacomponents/lista-salas/lista-salas.component';
import { ConfirmtoggleuserwebComponent } from './components/admin/views/dashboard/utils/confirmtoggleuserweb/confirmtoggleuserweb.component';
import { ConfirmdialogdeletesalaComponent } from './components/admin/views/dashboard/utils/confirmdialogdeletesala/confirmdialogdeletesala.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CrearClienteComponent } from './components/user/dashboard/dcomponents/clientecomponents/crear-cliente/crear-cliente.component';
import { ListaClienteComponent } from './components/user/dashboard/dcomponents/clientecomponents/lista-cliente/lista-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginadminComponent,
    DashboardMainComponent,
    CrearEmpresaComponent,
    ListaEmpresasComponent,
    EditarEmpresaComponent,
    EliminarEmpresaComponent,
    ConfirmtoggleComponent,
    ListaUsuariosComponent,
    CrearUsuarioComponent,
    DashboardUserComponent,
    CrearSalaComponent,
    ListaSalasComponent,
    ConfirmtoggleuserwebComponent,
    ConfirmdialogdeletesalaComponent,
    CrearClienteComponent,
    ListaClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatCard,
    _MatInternalFormField,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTable,
    MatRow,
    MatCell,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
