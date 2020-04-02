import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Request, PutRequest } from 'app/interfaces/request';
import { MatTableDataSource, MatDialog, MatSnackBar  } from '@angular/material';
import { USER_TYPE } from 'app/interfaces/user';
import { DialogScheduleReservedComponent } from 'app/dialogs/dialog-schedule-reserved.component';
import { MaterialListComponent } from '../material-list/material-list.component'
import { RejectReasonComponent } from '../reject-reason/reject-reason.component'
import { Router } from '@angular/router';
import { ConfirmRejectionMessageComponent, DialogData } from 'app/popups/dialogs/confirm-rejection-message/confirm-rejection-message.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  is_admin: boolean;
  reason: String;
  requests: Request[];
  dataSource = new MatTableDataSource(this.requests);
  // Columns para Admin
  displayedColumns = ['name', 'type', 'subject_id', 'room_id', 'material_needed', 'quantity', 'send_time', 'Horario', 'Aprobar']; 
  // Colums para Users
  displayedColumns1 = ['subject_id', 'room_id', 'material_needed', 'quantity', 'send_time', 'Horario', 'status', 'eliminar'];

  constructor( 
    private appService: AppService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
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
        console.log(requests);
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
      if (request.message) {
        this.showSnackBar(request.message);
      } else if (request.error) {
        this.showSnackBar(request.error);
      } else {
        console.log(request);
      }

    });
  }

  // Modal con los materiales solicitados para la sala
  openMaterialDialog(element) {
    this.dialog.open(MaterialListComponent, {
      height:'300px',
      width:'450px',
      data: { 
      
        room_id: element.room_id,
        material_needed: element.material_needed }
    });
  }

  // Modal con la razon de rechazo de la solicitud
  rejectReasonDialog(element) {
    this.dialog.open(RejectReasonComponent, {
      height:'300px',
      width:'480px',
    data: {
      reason: element.reason 
    } });
    

  }

  // Boton de rechazo + modal 
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
          const index = this.requests.findIndex(res => res.id === requestId);
          this.requests.splice(index,1);
          this.dataSource.data = this.requests;
          if (response.message) {
            this.showSnackBar(response.message);
          } else if (response.error) {
            this.showSnackBar(response.error);
          } else {
            console.log(response);
          }
        });
      }
    });
  }

  // Modal de Horario
  viewSchedule(request: any){
    let dialogRef = this.dialog.open(DialogScheduleReservedComponent,{
      height: '650px',
      width: '575px',
      data: {
        dataKey: request
      }
    });
    dialogRef.afterClosed().subscribe( data => {
      console.log(data);
    });
  }
  
  // Mensajito que sale cuando abajo en los botones de si y no
  showSnackBar(message: string) {
    this._snackBar.open(message, null, { duration: 4000 });
  }

  // Eliminar una peticion
  deletedUser(requestId: string) {
    this.appService.deleteUser(requestId).subscribe ( request => {
      const index = this.requests.findIndex(res => res.id === requestId);
      this.requests.splice(index,1);
      this.dataSource.data = this.requests;
      if (request.message) {
        this.showSnackBar(request.message);
      } else if (request.error) {
        this.showSnackBar(request.error);
      } else {
        console.log(request);
      }
    });
  }
}
