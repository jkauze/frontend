import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Trimester } from 'app/interfaces/trimester';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomRequest } from 'app/interfaces/room_request';
import { USER_TYPE } from 'app/interfaces/user';
import { Router } from '@angular/router';
import { ConfirmRejectionComponent } from 'app/popups/dialogs/confirm-rejection/confirm-rejection.component';

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

  constructor(
    private app: AppService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getTrimester();
    this.getRoomRequests();
  }

  getTrimester() {
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
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  getRoomRequests() {
    this.app.isUserType(USER_TYPE.LAB_F).then(isLabF => {
      if (isLabF) {
        this.app.getRoomRequests('labf/solicitudes').subscribe(requests => {
          this.elements = requests;
          this.dataSource.data = this.elements;
        });
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  onSubmit(trimesterData) {
    this.actionsDisabled = true;
    const dates = {
      start: new Date(trimesterData.startDate).toISOString(),
      finish: new Date(trimesterData.finishDate).toISOString()
    };
    this.app.putTrimester(this.trimester.id, dates).subscribe(
      this.manageResponse,
      this.manageError,
      this.manageComplete
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  acceptRequest(requestId: string) {
    this.actionsDisabled = true;
    const status = 'A';
    this.app.putRoomRequests(requestId, status).subscribe(
      this.manageResponse,
      this.manageError,
      this.manageComplete
    );
  }

  openRejectionDialog(requestId: string) {
    this.actionsDisabled = true;
    const dialogRef = this.dialog.open(ConfirmRejectionComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const status = 'R';
        this.app.putRoomRequests(requestId, status).subscribe(
          this.manageResponse,
          this.manageError,
          this.manageComplete
        );
      } else {
        this.actionsDisabled = false;
      }
    });
  }

  manageResponse = (response) => {
    if (response.message) {
      this.showSnackBar(response.message);
    } else if (response.error) {
      this.showSnackBar(response.error);
    } else {
      console.log(response);
    }
    this.getTrimester();
    this.getRoomRequests();
  }

  manageError = (error) => {
    if (error.error.error) {
      this.showSnackBar(error.error.error);
    } else {
      console.log(error);
    }
    this.manageComplete();
  }

  manageComplete = () => {
    this.actionsDisabled = false;
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, null, { duration: 4000 });
  }

}
