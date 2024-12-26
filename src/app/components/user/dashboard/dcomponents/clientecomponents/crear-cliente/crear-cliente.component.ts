import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../../../../services/dashboard/cliente.service';
import { UserwebService } from '../../../../../../services/dashboard/userweb.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent implements OnInit {
  clienteForm: FormGroup;
  salas: any[] = []; // Aquí almacenamos las salas obtenidas

  ngOnInit(): void {
    this.loadSalas();
    
    if (this.data) {
      // Si estás editando, carga los datos en el formulario
      this.clienteForm.patchValue(this.data);
    }
  }
  

  constructor(
    public dialogRef: MatDialogRef<CrearClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: ClienteService,
    private salasService: UserwebService
  ) {
    this.clienteForm = this.fb.group({
      imei: [data?.imei || ''],
      sala: [data?.sala || '']
    });
  }

  loadSalas(): void {
    this.salasService.getAll().subscribe(data => {
      this.salas = data; // Asigna las salas obtenidas al arreglo
    });
  }

  save(): void {
    const cliente = this.clienteForm.value;
    if (this.data) {
      this.userService.update(this.data._id, cliente).subscribe(() => this.dialogRef.close());
    } else {
      this.userService.create(cliente).subscribe(() => this.dialogRef.close());
    }
  }
}
