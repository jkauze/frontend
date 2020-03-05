import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Trimester } from 'app/interfaces/trimester';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomRequest } from 'app/interfaces/room_request';
import { USER_TYPE } from 'app/interfaces/user';
import { Router } from '@angular/router';
import { ConfirmRejectionComponent, DialogData } from 'app/popups/dialogs/confirm-rejection/confirm-rejection.component';

@Component({
  selector: 'app-labf-admin',
  templateUrl: './labf-admin.component.html',
  styleUrls: ['./labf-admin.component.scss']
})
export class LabfAdminComponent implements OnInit {

  elements: RoomRequest[];
  dataSource = new MatTableDataSource(this.elements);
  displayedColumns = [
    'room_id',
    'requester_id',
    'owner_id',
    'manager_id',
    'trimester',
    'send_time',
    'actions'
  ];

  public trimester: Trimester;
  trimesterForm: FormGroup;
  trimesterFormChanged: boolean;

  // buttons controllers
  actionsDisabled = false;
  trimesterDisabled = false;

  constructor(
    private app: AppService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.app.isUserType(USER_TYPE.LAB_F).then(isLabF => {
      if (isLabF) {
        this.app.getTrimester().subscribe(trimesters => {
          if (trimesters.length === 1) {
            this.trimester = trimesters[0];
            this.trimesterForm = this.formBuilder.group({
              startDate: this.trimester.start,
              finishDate: this.trimester.finish
            });
          }
        });
        this.app.getRoomRequests().subscribe(requests => {
          this.elements = requests;
          this.dataSource.data = this.elements;
        });
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  onSubmit(trimesterData) {
    this.trimesterDisabled = true;
    const dates = {
      start: new Date(trimesterData.startDate).toISOString(),
      finish: new Date(trimesterData.finishDate).toISOString()
    };
    this.app.putTrimester(this.trimester.id, dates).subscribe(response => {
      this._snackBar.open(response.message, null, { duration: 5000 });
      this.trimesterDisabled = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  acceptRequest(request: RoomRequest) {
    this.actionsDisabled = true;
    const status = 'A';
    this.app.putRoomRequests(request.id, status).subscribe(response => {
      this._snackBar.open(response.message, null, { duration: 5000 });
      this.actionsDisabled = false;
      console.log(response);
    });
  }

  openRejectionDialog(request: RoomRequest) {
    this.actionsDisabled = true;
    const dialogData: DialogData = {
      reason: ''
    };
    const dialogRef = this.dialog.open(ConfirmRejectionComponent, {
      width: '300px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result && result.trim().length > 0) {
      //   console.log('The dialog was closed with reason: ' + result);
      // }
      const status = 'R';
      this.app.putRoomRequests(request.id, status).subscribe(response => {
        this._snackBar.open(response.message, null, { duration: 5000 });
        this.actionsDisabled = false;
      });
    });
  }

}
