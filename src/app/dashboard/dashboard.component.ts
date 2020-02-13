import { Component, OnInit } from '@angular/core';
import { Rooms } from 'app/interfaces/rooms';
import { AppService } from 'app/app.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public rooms: Rooms[];
  public is_admin: boolean;

  constructor(private api: AppService) { }

  ngOnInit() {
    this.is_admin = this.api.isAdminUser();
    console.log(this.is_admin);
    if (this.is_admin) {
      const user = this.api.user;
      this.api.getRooms("salas/admin/" + user.id)
      .subscribe(rooms => {
        this.rooms = rooms;
        this.loadImages();
      })
    } else {
      this.api.getRooms("salas")
      .subscribe(rooms => {
        this.rooms = rooms;
        this.loadImages();
      });
    }
    
  }

  loadImages() {
    this.rooms.forEach(room => {
      room.path_image = environment.api_url_do + "salas/" + room.id + "/picture";
    });
    console.log(this.rooms);
  }
}
