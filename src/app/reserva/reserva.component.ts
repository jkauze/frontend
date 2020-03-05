import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogSemanasEspecificasComponent } from 'app/dialogs/dialog-semanas-especificas.component';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})

export class ReservaComponent implements OnInit {
  public roomId: string;
  public semanas: string;
  public materia: string;
  public seccion: string;
  public materiasOptions: any[];
  public isTableReady: boolean = false;
  public displayedColumns: string[] = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  public dataSource: any[];
  
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private appService: AppService,
  ) {
    this.roomId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.obtenerMaterias();
  }

  obtenerMaterias() {
    this.appService.getSubjects()
    .subscribe( response => {
      this.materiasOptions = response;
    })
  }

  onSelectSemanas() {
    let data;
    console.log(this.semanas);
    if (this.semanas == 'especifica') {
      // dialog semanas especificas
      let dialogRef = this.dialog.open(DialogSemanasEspecificasComponent)
      dialogRef.afterClosed().subscribe( result => {
        console.log(result);
        this.appService.getReservations(this.roomId, result)
        .finally( () => {
          if ( data.length == 0 ) {
            for (let index = 0; index < 10; index++) {
              data[index] =  { hora: index + 1 }
            }
          }
          this.dataSource = data;
          this.isTableReady = true;
        })
        .subscribe( response => {
          console.log( response );
          data = response;
        })
      })
    }
    else {
      // get tabla
      this.appService.getReservations(this.roomId, this.semanas)
      .finally( () => {
        if ( data.length == 0 ) {
          for (let index = 0; index < 10; index++) {
            data[index] =  { hora: index + 1 }
          }
        }
        this.dataSource = data;
        this.isTableReady = true;  // show tabla
      })
      .subscribe( response => {
        console.log( response );
        data = response;
      })
    }
  }

  reservar() {
    let body = {
      materia: this.materia,
      seccion: this.seccion,
      //semana
      horarios: this.dataSource
    }
    console.log(body)
  }
}
