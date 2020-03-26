import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-rejection',
  templateUrl: './confirm-rejection.component.html',
  styleUrls: ['./confirm-rejection.component.scss']
})
export class ConfirmRejectionComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmRejectionComponent>,
  ) { }

  onCancelClick() {
    this.dialogRef.close();
  }
}
