import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { USER_TYPE } from 'app/interfaces/user';
import { Rooms } from 'app/interfaces/rooms';

const API = environment.api_url;

@Component({
  selector: 'app-info-sala',
  templateUrl: './info-sala.component.html',
  styleUrls: ['./info-sala.component.scss']
})
export class InfoSalaComponent implements OnInit {
  public rooms = [];
  public items = [];
  public room: Rooms;
  
  private url: string ='salas/';
  private idroom: string;
  private urlitem: string = '/items';
  private picture: string;
  public is_admin: boolean;
  public active: boolean = true;
  public edit: boolean = false;
  
  constructor(public json: AppService, private activatedRoute: ActivatedRoute) { 
    this.idroom = this.activatedRoute.snapshot.params['rid'];
  }

  ngOnInit() {
    this.json.getRooms(this.url + this.idroom).subscribe((data) => {
      this.rooms = data;
      this.room = this.rooms[0];
      this.picture = API + this.url + this.idroom + '/picture';
    });
    
    this.json.getItems(this.url + this.idroom + this.urlitem).subscribe((data) => {
      this.items = data;
    });
    this.json.isUserType(USER_TYPE.LAB_ADMIN).then(isAdmin => { this.is_admin = isAdmin; });
  }
  
  isEdit(){
    this.edit = true;
  }

  isActive(){
    // Verificar si puede desactivar la sala
    this.active = false;
  }

  sumbitEdit(){
    const changes = { name: this.room.name, description: this.room.description, is_active: String(this.room.is_active) };
    console.log(changes);
    console.log(this.room.id);
    this.json.updateRoom(this.room.id,changes).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {console.log(err)}
    );
    this.edit = false
  }
  
}
