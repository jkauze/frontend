import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogSemanasEspecificasComponent } from 'app/dialogs/dialog-semanas-especificas.component';
import { AppService } from 'app/app.service';
import { DialogTextFieldComponent } from 'app/dialogs/dialog-textfield.component';

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
    if (this.semanas == 'especifica') {
      // dialog semanas especificas
      let dialogRef = this.dialog.open(DialogSemanasEspecificasComponent, {
        width: '300px',
        data: { data: data }
      })
      dialogRef.afterClosed().subscribe( result => {
        this.appService.getReservations(this.roomId, result)
        .finally( () => {
          this.dataSource = this.generarTabla(data);
          this.isTableReady = true;  // show tabla
        })
        .subscribe( response => {
          data = response;
        })
      })
    }
    else {
      // get tabla
      this.appService.getReservations(this.roomId, this.semanas)
      .finally( () => {
        this.dataSource = this.generarTabla(data);
        this.isTableReady = true;  // show tabla
      })
      .subscribe( response => {
        data = response;
      })
    }
  }

  generarTabla(data: any[]): any[] {
    let table = [];
    for (let index = 0; index < 10; index++) {
      table[index] =  { hora: index + 1 }
    }
    if ( data.length == 0 ) {
      data = table; // empty
    }
    else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].day === "Lunes"){
          table[data[i].hour - 1].lunes = data[i].subject_id;
        }
        else if(data[i].day === "Martes"){
          table[data[i].hour - 1].martes = data[i].subject_id;
        }
        else if(data[i].day === "Miercoles"){
          table[data[i].hour - 1].miercoles = data[i].subject_id;
        }
        else if(data[i].day === "Jueves"){
          table[data[i].hour - 1].jueves = data[i].subject_id;
        }
        else{
          table[data[i].hour - 1].viernes = data[i].subject_id;
        }
      }
    }
    return table
  }

  puedeReservar(): boolean {
    if (this.materia != undefined && this.seccion != ''  &&
    this.seccion != undefined && this.semanas != undefined) {
      const index = this.dataSource.findIndex(d => (
        d.lunesCheck == true || d.martesCheck == true || 
        d.miercolesCheck == true || d.juevesCheck == true || 
        d.viernesCheck == true)
      );
      if (index != -1) { return true; }
      else { return false; }
    }
    else { return false; }
  }

  reservar() {
    let body = {
      materia: this.materia,
      seccion: this.seccion,
      //semana
      horarios: this.dataSource
    }
    console.log(body)
    let dialogFieldRef = this.dialog.open(DialogTextFieldComponent, {
      data: { title: 'Reserva', message: 'Especifique si requiere de algo adicional'}
    });

    dialogFieldRef.afterClosed().subscribe( result => {
      console.log(result);
    })
  }
}
