import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api/api.service';
import { Room } from 'app/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public rooms: Room[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    console.log('getting rooms');
    this.api.getAllRooms().subscribe(
      (data) => {
        const roomsJson: object[] = JSON.parse(JSON.stringify(data));
        roomsJson.forEach(room => {
          this.rooms.unshift(new Room(room));
        });
    });

  }

}
