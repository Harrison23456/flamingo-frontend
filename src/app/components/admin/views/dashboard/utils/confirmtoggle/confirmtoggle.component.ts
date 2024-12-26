import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmtoggle',
  templateUrl: './confirmtoggle.component.html',
  styleUrl: './confirmtoggle.component.css'
})
export class ConfirmtoggleComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmtoggleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
