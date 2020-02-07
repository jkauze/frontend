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
  private url: string ='http://159.90.9.128/api/salas/';
  private idroom: string = 'MYS-111';
  private urlitem: string = '/items';

  constructor(public json: AppService) { 
    
  }

  ngOnInit() {
    this.json.getRooms(this.url + this.idroom).subscribe((data) => {
      this.rooms = data;
      console.log(data);
    });
    
    this.json.getItems(this.url + this.idroom +this.urlitem).subscribe((data) => {
      this.items = data;
      console.log(data);
    });
  }

}
