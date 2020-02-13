import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { environment } from 'environments/environment';

const API = environment.api_url_do;

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.scss']
})
export class LaboratoriosComponent implements OnInit {
  public url = 'salas/admin/';
  public rooms: any[];
  public staticAdmin = {id:"ldac",name:"MAC",email:"ldac@usb.ve",type:3333, is_active:true, chief:"cchang"};

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.appService.getRooms(this.url + this.staticAdmin.id ).subscribe((data) => {
      this.rooms = data;
      // add room picture
      this.rooms.forEach(sala => {
        let picture = API + 'salas/' + sala.id + '/picture';
        sala['picture'] = picture;    
      });
      console.log(this.rooms);
    });
  }


}
