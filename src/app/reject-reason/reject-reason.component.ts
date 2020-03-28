import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-reject-reason',
  templateUrl: './reject-reason.component.html',
  styleUrls: ['./reject-reason.component.scss']
})
export class RejectReasonComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RejectReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}




