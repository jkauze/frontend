import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';

const API = environment.api_url;

@Component({
  selector: 'app-salas-user',
  templateUrl: './salas-user.component.html',
  styleUrls: ['./salas-user.component.scss']
})
export class SalasUserComponent implements OnInit {
  public id: string;
  public lab: any;
  public url = 'salas/admin/';
  public rooms: any[];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.appService.getAdminLabs()
    .subscribe( response => {
      this.lab = response.find( l => l.id == this.id)
    });

    this.appService.getRooms(this.url + this.id ).subscribe((data) => {
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
