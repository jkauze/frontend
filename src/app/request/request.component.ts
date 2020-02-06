import { Component, OnInit } from '@angular/core';



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

  headElements = ['No', 'Solicitante', 'Materia', 'Horario', 'Sala', ];

  constructor() { }

  ngOnInit() {
  }

}
