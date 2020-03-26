import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Request, PutRequest } from 'app/interfaces/request';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { USER_TYPE } from 'app/interfaces/user';
import { ConfirmRejectionMessageComponent, DialogData } from 'app/popups/dialogs/confirm-rejection-message/confirm-rejection-message.component';

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
      // console.log(this.appService.user);
      if (this.is_admin) {
        endpoint = `solicitudes/admin/${this.appService.user.id}`;

      } else {
        endpoint = `solicitudes/usuario/${this.appService.user.id}`;

      }
      this.appService.getRequests(endpoint).subscribe(requests => {
        this.requests = requests;
        this.dataSource.data = this.requests;
      });
    }, error => {
      console.log(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  acceptRequest(requestId: string) {
    console.log(requestId);
    const putRequest: PutRequest = {
      reason: '',
      status: 'A'
    };
    this.appService.putRequest(requestId, putRequest).subscribe(request => {
      console.log(request);
    });
  }

  openRejectionDialog(requestId: string) {
    const dialogData: DialogData = {
      reason: '',
    }
    const dialogRef = this.dialog.open(ConfirmRejectionMessageComponent, {
      width: '300px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(reason => {
      if (reason) {
        console.log(reason);
        const putRequest: PutRequest = {
          reason: reason,
          status: 'R'
        };
        this.appService.putRequest(requestId, putRequest).subscribe(response => {
          console.log(response);
        });
      }
    });
  }
}
