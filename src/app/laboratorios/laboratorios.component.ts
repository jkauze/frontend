import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.scss']
})
export class LaboratoriosComponent implements OnInit {
  public url = 'salas/admin/';
  public labs: any[];
  
  constructor(
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.appService.getAdminLabs()
    .subscribe( response => {
      this.labs = response;
    })
  }

}
