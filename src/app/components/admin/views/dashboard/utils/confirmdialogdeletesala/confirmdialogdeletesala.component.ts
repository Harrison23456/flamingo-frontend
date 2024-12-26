import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialogdeletesala',
  templateUrl: './confirmdialogdeletesala.component.html',
  styleUrl: './confirmdialogdeletesala.component.css'
})
export class ConfirmdialogdeletesalaComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmdialogdeletesalaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // El usuario canceló
  }

  onConfirm(): void {
    this.dialogRef.close(true); // El usuario confirmó
  }
}
