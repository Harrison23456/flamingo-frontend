import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../../../../services/dashboard/usuarios.service';
import { EmpresaService } from '../../../../../../services/dashboard/empresa.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  form: FormGroup;
  empresas: any[] = []; // Lista de empresas disponibles
  isEditMode: boolean = false; // Modo edición

  constructor(
    private fb: FormBuilder,
    private userService: UsuariosService,
    private empresaService: EmpresaService,
    private dialogRef: MatDialogRef<CrearUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Datos pasados al diálogo
  ) {
    this.isEditMode = !!data?.user;
  const user = data?.user;

  this.form = this.fb.group({
    name: [user?.name || '', [Validators.required]],
    paternalsurname: [user?.paternalsurname || '', [Validators.required]],
    maternalsurname: [user?.maternalsurname || '', [Validators.required]],
    userweb: [user?.userweb || '', [Validators.required, Validators.email]],
    passwordweb: ['', []],  // Cambiado para no mostrar la contraseña encriptada
    usermobile: [user?.usermobile || '', [Validators.required, Validators.email]],
    passwordmobile: ['', []],  // Cambiado para no mostrar la contraseña encriptada
    company: [user?.company?._id || '', [Validators.required]],  // Mantener la empresa seleccionada
  });

  // Si estamos en modo de edición, llenamos los campos de contraseñas en función de lo que el usuario ingrese
  if (this.isEditMode) {
    this.form.get('passwordweb')?.setValidators([]);
    this.form.get('passwordmobile')?.setValidators([]);
  }
}

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Cargar lista de empresas
  loadCompanies(): void {
    this.empresaService.getAll().subscribe({
      next: (empresas) => (this.empresas = empresas),
      error: (err) => console.error('Error al cargar empresas:', err),
    });
  }

  // Manejar envío del formulario
  onSubmit(): void {
    if (this.form.invalid) return;
  
    const user = this.form.value;
    if (this.isEditMode) {
      // Editar usuario
      this.userService.updateUser(this.data.user._id, user).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al actualizar usuario:', err),
      });
    } else {
      // Crear usuario
      this.userService.createUser(user).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al crear usuario:', err),
      });
    }
  }
  
  // Cerrar el diálogo sin guardar
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
