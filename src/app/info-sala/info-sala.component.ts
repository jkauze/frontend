import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

const API = environment.api_url_do;

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
  public is_admin: boolean;
  public active: boolean = false;
  public edit: boolean = false;
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

    this.is_admin = this.json.isAdminUser();
  }
  
  isEdit(){
    this.edit = true;
  }

  isActive(){
    this.active = true;
  }

  sumbitEdit(){
    this.edit = false;
  }
}
