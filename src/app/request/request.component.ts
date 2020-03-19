import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Request, PutRequest } from 'app/interfaces/request';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { USER_TYPE } from 'app/interfaces/user';
import { ConfirmRejectionComponent, DialogData } from 'app/popups/dialogs/confirm-rejection/confirm-rejection.component';
import { MaterialListComponent } from '../material-list/material-list.component'
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

  // Boton de aceptar
  acceptRequest(requestId: string) {
    console.log(requestId);
    const putRequest: PutRequest = {
      reason: '',
      status: 'A'
    };
    this.appService.putRequest(requestId, putRequest).subscribe(request => {
      // Hacer que se refresque la tabla al aceptar
      const index = this.requests.findIndex(res => res.id === requestId);
      this.requests.splice(index,1);
      this.dataSource.data = this.requests;

    });
  }

  // Modal con los materiales solicitados para la sala
  openMaterialDialog(element) {
    
    this.dialog.open(MaterialListComponent, {
      height:'300px',
      width:'450px',
      panelClass: 'dialog-bor',
      data: { 
      
        room_id: element.room_id,
        material_needed: element.material_needed }
    });
  }

  // Boton de rechazo + modal 
  openRejectionDialog(requestId: string) {
    const dialogData: DialogData = {
      reason: '',
    }
    const dialogRef = this.dialog.open(ConfirmRejectionComponent, {
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
          const index = this.requests.findIndex(res => res.id === requestId);
          this.requests.splice(index,1);
          this.dataSource.data = this.requests;
        });
      }
    });
  }
}
