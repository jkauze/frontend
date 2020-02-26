import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Request } from 'app/interfaces/request';
import { MatTableDataSource } from '@angular/material/table';
import { USER_TYPE } from 'app/interfaces/user';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  is_admin: boolean;

  requests: Request[];
  dataSource = new MatTableDataSource(this.requests);
  displayedColumns = ['name', 'type', 'subject_id', 'room_id', 'material_needed', 'quantity', 'send_time', 'Horario', 'Aprobar'];
  displayedColumns1 = ['requester_id', 'subject_id', 'room_id', 'material_needed', 'quantity', 'send_time', 'Horario', 'status'];

  constructor( private appService: AppService) { }

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
}
