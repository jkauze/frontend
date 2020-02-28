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
  displayedColumns = ['requester_id', 'type', 'subject_id', 'room_id', 'send_time', 'Horario'];

  constructor( private appService: AppService) { }

  ngOnInit() {
    this.appService.isUserType(USER_TYPE.LAB_ADMIN).then(isAdmin => {
      this.is_admin = isAdmin;
      var endpoint: string;
      if (this.is_admin) {
        endpoint = `solicitudes/admin/${this.appService.user.id}`;
        this.displayedColumns.push('Aprobar');
      } else {
        endpoint = `solicitudes/${this.appService.user.id}`;
        this.displayedColumns.push('status');
      }
      this.appService.getRequests(endpoint).subscribe(requests => {
        this.requests = requests;
        this.dataSource.data = this.requests;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
