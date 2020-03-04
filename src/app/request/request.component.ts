import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Request } from 'app/interfaces/request';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { USER_TYPE } from 'app/interfaces/user';
import { ConfirmRejectionComponent, DialogData } from 'app/dialogs/confirm-rejection/confirm-rejection.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  is_admin: boolean;
  

  requests: Request[];
  dataSource = new MatTableDataSource(this.requests);
  // Columns para Admin
  displayedColumns = ['name', 'type', 'subject_id', 'room_id', 'material_needed', 'quantity', 'send_time', 'Horario', 'Aprobar']; 
  // Colums para Users
  displayedColumns1 = ['requester_id', 'subject_id', 'room_id', 'material_needed', 'quantity', 'send_time', 'Horario', 'status'];

  constructor( 
    private appService: AppService,
     public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.appService.isUserType(USER_TYPE.LAB_ADMIN).then(isAdmin => {
      this.is_admin = isAdmin;
      var endpoint: string;
      if (this.is_admin) {
        endpoint = `solicitudes/admin/${this.appService.user.id}`;

      } else {
        endpoint = `solicitudes/usuario/${this.appService.user.id}`;

      }
      this.appService.getRequests(endpoint).subscribe(requests => {
        this.requests = requests;
        console.log(this.requests)
        this.dataSource.data = this.requests;
        console.log(this.dataSource.data)
      });
    });
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
