import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresaService } from '../../../../../services/dashboard/empresa.service';
import { UserwebService } from '../../../../../services/dashboard/userweb.service';

@Component({
  selector: 'app-crear-sala',
  templateUrl: './crear-sala.component.html',
  styleUrl: './crear-sala.component.css'
})
export class CrearSalaComponent {
  salaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrearSalaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private companyService: UserwebService
  ) {
    this.salaForm = this.fb.group({
      name: [data?.name || ''],
      address: [data?.address || ''],

    });
  }

  save(): void {
    const sala = this.salaForm.value;
    if (this.data) {
      this.companyService.update(this.data._id, sala).subscribe(() => this.dialogRef.close());
    } else {
      this.companyService.create(sala).subscribe(() => this.dialogRef.close());
    }
  }
}
