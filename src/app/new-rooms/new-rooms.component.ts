import { Component, OnInit } from '@angular/core';
import { RoomRequest } from 'app/interfaces/room_request';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { USER_TYPE } from 'app/interfaces/user';

@Component({
  selector: 'app-new-rooms',
  templateUrl: './new-rooms.component.html',
  styleUrls: ['./new-rooms.component.scss']
})
export class NewRoomsComponent implements OnInit {

  elements: RoomRequest[];
  dataSource = new MatTableDataSource(this.elements);
  displayedColumns = ['room_id', 'send_time', 'status'];
  newRoomForm: FormGroup;
  newRoomFormChanged: boolean;
  actionsDisabled = false;

  constructor(
    private app: AppService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getNewRoomRequests();
  }

  getNewRoomRequests() {
    this.app.isUserType(USER_TYPE.LAB_ADMIN).then(isLabAdmin => {
      if (isLabAdmin) {

      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  onSubmit(newRoomData) {
    this.actionsDisabled = true;
    const room_id = newRoomData.room_id;
    this.app.postRoomRequest(room_id).subscribe(
      this.manageResponse,
      this.manageError,
      this.manageComplete
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  manageResponse = (response) => {
    if (response.message) {
      this.showSnackBar(response.message);
    } else if (response.error) {
      this.showSnackBar(response.error);
    } else {
      console.log(response);
    }
    this.getNewRoomRequests();
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

  showSnackBar(message) {
    this.snackBar.open(message, null, { duration: 4000 });
  }
}
