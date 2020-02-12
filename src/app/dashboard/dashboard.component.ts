import { Component, OnInit } from '@angular/core';
import { Rooms } from 'app/interfaces/rooms';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public rooms: Rooms[];

  constructor(private api: AppService) { }

  ngOnInit() {
    this.api.getRooms("salas")
    .subscribe(rooms => {
      this.rooms = rooms;
    });
  }
}
