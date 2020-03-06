import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  reason: string;
}

@Component({
  selector: 'app-confirm-rejection',
  templateUrl: './confirm-rejection.component.html',
  styleUrls: ['./confirm-rejection.component.scss']
})
export class ConfirmRejectionComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmRejectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  onCancelClick() {
    this.dialogRef.close();
  }

}
