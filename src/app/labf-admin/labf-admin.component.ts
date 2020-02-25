import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Trimester } from 'app/interfaces/trimester';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomRequest } from 'app/interfaces/room_request';
import { USER_TYPE } from 'app/interfaces/user';
import { Router } from '@angular/router';
import { ConfirmRejectionComponent, DialogData } from 'app/dialogs/confirm-rejection/confirm-rejection.component';

@Component({
  selector: 'app-labf-admin',
  templateUrl: './labf-admin.component.html',
  styleUrls: ['./labf-admin.component.scss']
})
export class LabfAdminComponent implements OnInit {

  elements: RoomRequest[] = [
    { requester_id: '15-10103', requester_name: 'Alvaro Avila', requester_type: 3333, room_id: 'Salita', send_time: new Date() }
  ];
  dataSource = new MatTableDataSource(this.elements);
  displayedColumns = ['requester_id', 'requester_name', 'type', 'room_id', 'send_time', 'details', 'actions'];

  public trimester: Trimester;
  trimesterForm: FormGroup;
  trimesterFormChanged: boolean;

  constructor(
    private app: AppService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
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
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  trimesterChange() {
    console.log(this.trimesterForm.value);
  }

  onSubmit(trimesterData) {
    console.log(trimesterData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openRejectionDialog() {
    const dialogData: DialogData = {
      reason: ''
    }
    const dialogRef = this.dialog.open(ConfirmRejectionComponent, {
      width: '300px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.trim().length > 0) {
        console.log('The dialog was closed with reason: ' + result);
      }
    });
  }

}
