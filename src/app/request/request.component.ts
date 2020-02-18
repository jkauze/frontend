import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Request } from 'app/interfaces/request';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  elements: any = [
    {id: 1, first: 'Alvaro Avila', second: 'Algos', time: '1-2', room: 'Sala E'},
    {id: 2, first: 'Pepito Perez', second: 'Algos2', time: '3-4', room: 'Sala F'},
    {id: 3, first: 'Coco Sete', second: 'Algos3', time: '4-5', room: 'Sala A'},
  ];

  userProfile: any = {
    id: 'ldac',
    type: 3333
  }
  is_admin: boolean;

  requests: Request[];
  dataSource = new MatTableDataSource(this.requests);
  displayedColumns = ['name', 'type', 'subject_id', 'room_id', 'send_time'];

  headElements = ['No', 'Solicitante', 'Materia', 'Horario', 'Sala', 's'];

  constructor( private appService: AppService) { }

  ngOnInit() {
    this.is_admin = this.userProfile.type === 3333;
    if (this.is_admin) {
      var endpoint = this.userProfile.type === 3333 ? 
        `solicitudes/admin/${this.userProfile.id}` : 
        `solicitudes/${this.userProfile.id}`;
      this.displayedColumns.push('Aprobar');
    } else {
      this.displayedColumns.push('status');
    }

    this.appService.getRequests(endpoint).subscribe(requests => {
      this.requests = requests;
      this.dataSource.data = this.requests;
      console.log(this.requests);
    }, error => {
      console.log(error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
