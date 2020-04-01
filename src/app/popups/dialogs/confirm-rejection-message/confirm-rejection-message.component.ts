import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  reason: string;
}

@Component({
  selector: 'app-confirm-rejection-message',
  templateUrl: './confirm-rejection-message.component.html',
  styleUrls: ['./confirm-rejection-message.component.scss']
})
export class ConfirmRejectionMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmRejectionMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
