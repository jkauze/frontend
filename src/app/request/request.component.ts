import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

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

  requests: any;

  headElements = ['No', 'Solicitante', 'Materia', 'Horario', 'Sala', ];

  constructor( private appService: AppService) { }

  ngOnInit() {
    const endpoint = this.userProfile.type === 3333 ? `solicitudes/admin/${this.userProfile.id}` : 
      `solicitudes/${this.userProfile.id}`;

    this.appService.getRequest(endpoint).subscribe(requests => {
      this.requests = requests;
      console.log(this.requests);
    }, error => {
      console.log(error);
    })
  }
}
