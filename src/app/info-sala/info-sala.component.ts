import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-info-sala',
  templateUrl: './info-sala.component.html',
  styleUrls: ['./info-sala.component.scss']
})
export class InfoSalaComponent implements OnInit {
  public rooms = [];
  public items = [];
  
  private url: string ='salas/';
  private idroom: string = 'MYS-019'; // de aqui
  private urlitem: string = '/items';
  constructor(public json: AppService) { 
    // this.activatedRoute.snapshot.params['uid'];
  }

  ngOnInit() {
    this.json.getRooms(this.url + this.idroom).subscribe((data) => {
      this.rooms = data;
      //this.imagen = this.imagen + this.rooms[0].image;
      console.log(data);
    });
    
    this.json.getItems(this.url + this.idroom +this.urlitem).subscribe((data) => {
      this.items = data;
      console.log(data);
    });
  }

}
