import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { USER_TYPE } from 'app/interfaces/user';

const API = environment.api_url;

@Component({
  selector: 'app-info-sala',
  templateUrl: './info-sala.component.html',
  styleUrls: ['./info-sala.component.scss']
})
export class InfoSalaComponent implements OnInit {
  public rooms = [];
  public items = [];
  
  private url: string ='salas/';
  private idroom: string;
  private urlitem: string = '/items';
  private picture: string;
  private is_admin: boolean;
  constructor(public json: AppService, private activatedRoute: ActivatedRoute) { 
    this.idroom = this.activatedRoute.snapshot.params['rid'];
  }

  ngOnInit() {
    this.json.getRooms(this.url + this.idroom).subscribe((data) => {
      this.rooms = data;
      this.picture = API + this.url + this.idroom + '/picture';
      console.log(this.picture);
    });
    
    this.json.getItems(this.url + this.idroom + this.urlitem).subscribe((data) => {
      this.items = data;
      console.log(data);
    });
    this.json.isUserType(USER_TYPE.LAB_ADMIN).then(isAdmin => { this.is_admin = isAdmin; });
  }

}
