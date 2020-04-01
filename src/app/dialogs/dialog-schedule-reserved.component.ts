import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from 'app/app.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { tableWeek } from 'app/horario/horario.component';

@Component({
  selector: 'app-dialog-schedule-reserved',
  template: `
    <h2 mat-dialog-title> Horario </h2>
    <mat-dialog-content>
      <table mat-table [dataSource]="dataSource" class="table-bordered" summary="Horario del Laboratorio">
          <!-- Hora Column -->
          <ng-container matColumnDef="hora">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 10%" scope="col"> Hora </th>
            <td mat-cell *matCellDef="let element" class="text-center table-dark"> {{element.hora}} </td>
          </ng-container>

          <!-- Lunes Column -->
          <ng-container matColumnDef="lunes">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Lunes </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.lunes === null, 'text-center table-info': element.lunes !== null}"> 
            </td>
          </ng-container>

          <!-- Martes Column -->
          <ng-container matColumnDef="martes">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Martes </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.martes === null, 'text-center table-info': element.martes !== null}">
            </td>
          </ng-container>

          <!-- Miercoles Column -->
          <ng-container matColumnDef="miercoles">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Miércoles </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.miercoles === null, 'text-center table-info': element.miercoles !== null}">
            </td>
          </ng-container>

          <!-- Jueves Column -->
          <ng-container matColumnDef="jueves">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Jueves </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.jueves === null, 'text-center table-info': element.jueves !== null}">
            </td>
          </ng-container>
          
          <!-- Viernes Column -->
          <ng-container matColumnDef="viernes">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Viernes </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.viernes === null, 'text-center table-info': element.viernes !== null}"> 
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button *ngIf="addItemName != 'Item' && postQuantity > 0" mat-button mat-dialog-close class="btn btn-success" (click)="addItem()">Guardar</button>
      <button mat-button mat-dialog-close class="btn btn-default">Cerrar</button>
    </mat-dialog-actions>
  `
})
export class DialogScheduleReservedComponent implements OnInit {
  displayedColumns = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  public dataSource: tableWeek[];

  constructor(public json: AppService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.json.getViewSchedule(this.data.dataKey.id).subscribe((data) => {
      this.dataSource = this.mapear(data);
    });
  }

  mapear(data): tableWeek[]{
    let table = JSON.parse(JSON.stringify(ELEMENT_EMPTY));
    for (let i = 0; i < data.length; i++) {
      if (data[i].day === "Lunes"){
        table[data[i].hour - 1].lunes = '0';
      }
      else if(data[i].day === "Martes"){
        table[data[i].hour - 1].martes = '0';
      }
      else if(data[i].day === "Miercoles"){
        table[data[i].hour - 1].miercoles = '0';
      }
      else if(data[i].day === "Jueves"){
        table[data[i].hour - 1].jueves = '0';
      }
      else{
        table[data[i].hour - 1].viernes = '0';
      }
    }
    return table;
  }

}

const ELEMENT_EMPTY: tableWeek[] = [
  {hora: 1, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 2, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 3, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 4, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 5, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 6, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 7, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 8, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 9, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 10, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 11, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null},
  {hora: 12, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null}
];
