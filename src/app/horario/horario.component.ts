import { Component, OnInit } from '@angular/core';
import { Hourtable } from 'app/interfaces/hourtable';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {
  displayedColumns = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  private idroom: string;
  public dataSource: tableWeek[];
  private tablejson: Hourtable[];

  constructor(public json: AppService, private activatedRoute: ActivatedRoute) { 
    this.idroom = this.activatedRoute.snapshot.params['rid'];
  }

  ngOnInit() {
    this.allWeeks()
  }

  evenWeeks(){
    this.json.getSchedule(this.idroom, "3", null).subscribe((data) => {
      this.tablejson = data;
      this.dataSource= this.mapear(this.tablejson);
    });
  }

  oddWeeks(){
    this.json.getSchedule(this.idroom, "2", null).subscribe((data) => {
      this.tablejson = data;
      this.dataSource= this.mapear(this.tablejson);
    });
  }

  allWeeks(){
    this.json.getSchedule(this.idroom, "4", null).subscribe((data) => {
      this.tablejson = data;
      this.dataSource= this.mapear(this.tablejson);
    });
  }

  specificWeek(num: number){
    this.json.getSchedule(this.idroom, "1", num.toString()).subscribe((data) => {
      this.tablejson = data;
      this.dataSource= this.mapear(this.tablejson);
    });
  }
  mapear(data: Hourtable[]): tableWeek[]{
    let table = JSON.parse(JSON.stringify(ELEMENT_EMPTY));
    for (let i = 0; i < data.length; i++) {
      if (data[i].day === "lunes"){
        table[data[i].hour - 1].lunes = data[i].subject_id;
      }
      else if(data[i].day === "martes"){
        table[data[i].hour - 1].martes = data[i].subject_id;
      }
      else if(data[i].day === "miercoles"){
        table[data[i].hour - 1].miercoles = data[i].subject_id;
      }
      else if(data[i].day === "jueves"){
        table[data[i].hour - 1].jueves = data[i].subject_id;
      }
      else{
        table[data[i].hour - 1].viernes = data[i].subject_id;
      }
    }
    return table;
  }
}

export interface tableWeek {
  hora: number;
  lunes?: string;
  martes?: string;
  miercoles?: string;
  jueves?: string;
  viernes?: string;
}

const ELEMENT_EMPTY: tableWeek[] = [
  {hora: 1, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 2, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 3, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 4, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 5, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 6, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 7, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 8, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 9, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 10, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 11, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 12, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null}
];


