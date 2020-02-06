import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-info-sala',
  templateUrl: './info-sala.component.html',
  styleUrls: ['./info-sala.component.scss']
})
export class InfoSalaComponent implements OnInit {

  constructor(public json: AppService) { 
    this.json.getJson('http://159.90.9.128:3000/api/items').subscribe((res: any) => {
      console.log(res);
    });
  }



  ngOnInit() {
  }

}
