import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresaService } from '../../../../../../services/dashboard/empresa.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrl: './crear-empresa.component.css'
})
export class CrearEmpresaComponent {
  companyForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrearEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private companyService: EmpresaService
  ) {
    this.companyForm = this.fb.group({
      name: [data?.name || ''],
      ruc: [data?.ruc || ''],
      address: [data?.address || ''],
      mobiles: [data?.mobiles || ''],
      fechaInicio: [data?.fechaInicio || null],
      fechaFin: [data?.fechaFin || null],
      expirationTime: [data?.expirationTime || ''], // Solo para mantener la lógica interna
    });
  }

  onDateChange(): void {
    const fechaInicio = this.companyForm.get('fechaInicio')?.value;
    const fechaFin = this.companyForm.get('fechaFin')?.value;

    if (fechaInicio && fechaFin) {
      const diffTime = Math.abs(new Date(fechaFin).getTime() - new Date(fechaInicio).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.companyForm.patchValue({ expirationTime: diffDays });
    }
  }

  save(): void {
    const company = this.companyForm.value;
    if (this.data) {
      this.companyService.update(this.data._id, company).subscribe(() => this.dialogRef.close());
    } else {
      this.companyService.create(company).subscribe(() => this.dialogRef.close());
    }
  }
}
