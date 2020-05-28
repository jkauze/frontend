import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from 'app/app.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { tableWeek } from 'app/horario/horario.component';

@Component({
  selector: 'app-dialog-schedule-reserved',
  template: `
    <h2 mat-dialog-title class="prueba"> Horario </h2>
    <mat-dialog-content>
      <h2> {{ weekTypeName }} </h2>
      <table mat-table [dataSource]="dataSource" class="table-bordered" summary="Horario del Laboratorio">
          <!-- Hora Column -->
          <ng-container matColumnDef="hora">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 10%" scope="col"> Hora </th>
            <td mat-cell *matCellDef="let element" class="text-center table-dark"> {{element.hora}} </td>
          </ng-container>

          <!-- Lunes Column -->
          <ng-container matColumnDef="lunes">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Lunes </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.lunes === null, 'text-center table-warning': element.lunes === '0', 'text-center table-info': element.lunes === '1', 'text-center table-danger': element.lunes === '2'}"> 
            </td>
          </ng-container>

          <!-- Martes Column -->
          <ng-container matColumnDef="martes">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Martes </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.martes === null, 'text-center table-warning': element.martes === '0', 'text-center table-info': element.martes === '1', 'text-center table-danger': element.martes === '2'}">
            </td>
          </ng-container>

          <!-- Miercoles Column -->
          <ng-container matColumnDef="miercoles">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Miércoles </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.miercoles === null, 'text-center table-warning': element.miercoles === '0', 'text-center table-info': element.miercoles === '1', 'text-center table-danger': element.miercoles === '2'}">
            </td>
          </ng-container>

          <!-- Jueves Column -->
          <ng-container matColumnDef="jueves">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Jueves </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.jueves === null, 'text-center table-warning': element.jueves === '0', 'text-center table-info': element.jueves === '1', 'text-center table-danger': element.jueves === '2'}">
            </td>
          </ng-container>
          
          <!-- Viernes Column -->
          <ng-container matColumnDef="viernes">
            <th mat-header-cell *matHeaderCellDef class="table-dark text-center" style="width: 18%" scope="col"> Viernes </th>
            <td mat-cell *matCellDef="let element" [ngClass]="{'text-center': element.viernes === null, 'text-center table-warning': element.viernes === '0', 'text-center table-info': element.viernes === '1', 'text-center table-danger': element.viernes === '2'}"> 
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns;" class="table-row"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
      </table>
      <br>
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="" disabled>
          Por reservar
          <span class="form-check-sign">
            <span class="check" style="background: #b8ecf3;"></span>
          </span>
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="" disabled>
          Ocupadas
          <span class="form-check-sign">
            <span class="check" style="background: #fff9c8;"></span>
          </span>
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="" disabled>
          Ya Ocupada
          <span class="form-check-sign">
            <span class="check" style="background: #fccac7;"></span>
          </span>
        </label>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions style="justify-content: flex-end">
      <button mat-button mat-dialog-close class="btn btn-default">Cerrar</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./dialog-add-item.component.scss']
})
export class DialogScheduleReservedComponent implements OnInit {
  displayedColumns = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  public dataSourceReserved: tableWeek[];
  public dataSource: tableWeek[];
  public dataBlock: tableWeek[];
  public weekType: string;
  public weekTypeName: string = '';
  public specificWeek: boolean = false;

  constructor(public json: AppService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.json.getViewSchedule(this.data.dataKey.id).subscribe((data) => {
      this.dataSourceReserved = this.mapear(data.shedule);
      console.log(data.typeWeek);
      if (data.typeWeek == "pares"){ 
        this.weekType = "3";
        this.weekTypeName = "Semanas: Pares";
      }
      else if (data.typeWeek == "impares"){
        this.weekType = "2";
        this.weekTypeName = "Semanas: Impares";
      }
      else if (data.typeWeek == "todas"){
        this.weekType = "4";
        this.weekTypeName = "Semanas: Todas";
      }
      else{
        this.specificWeek = true;
        this.weekType = data.typeWeek;
        this.weekTypeName = "Semana Especifica: " + data.typeWeek;
      }
      if ((this.weekType == "2" || this.weekType == "3" || this.weekType == "4") && this.specificWeek == false){
        this.json.getSchedule(data.shedule[0].room_id, this.weekType, null).subscribe((data) => {
          this.dataBlock= this.mapear(data);
          this.dataSource= this.merge(this.dataSourceReserved,this.dataBlock);
        });
      }
      else{
        this.json.getSchedule(data.shedule[0].room_id, "1", this.weekType).subscribe((data) => {
          this.dataBlock= this.mapear(data);
          this.dataSource= this.merge(this.dataSourceReserved,this.dataBlock);
        });
      }
    });
  }

  mapear(data): tableWeek[]{
    let table = JSON.parse(JSON.stringify(ELEMENT_EMPTY));
    for (let i = 0; i < data.length; i++) {
      if (data[i].day === "lunes"){
        table[data[i].hour - 1].lunes = '0';
      }
      else if(data[i].day === "martes"){
        table[data[i].hour - 1].martes = '0';
      }
      else if(data[i].day === "miercoles"){
        table[data[i].hour - 1].miercoles = '0';
      }
      else if(data[i].day === "jueves"){
        table[data[i].hour - 1].jueves = '0';
      }
      else{
        table[data[i].hour - 1].viernes = '0';
      }
    }
    return table;
  }

  merge(reserved, block): tableWeek[]{
    let table = JSON.parse(JSON.stringify(ELEMENT_EMPTY));
    for (let i = 0; i < reserved.length; i++) {
      if (reserved[i].lunes != null && block[i].lunes != null){
        table[i].lunes = '2';
      }
      else if (reserved[i].lunes != null && block[i].lunes == null){
        table[i].lunes = '1';
      }
      else if (reserved[i].lunes == null && block[i].lunes != null){
        table[i].lunes = '0';
      }
      if (reserved[i].martes != null && block[i].martes != null){
        table[i].martes = '2';
      }
      else if (reserved[i].martes != null && block[i].martes == null){
        table[i].martes = '1';
      }
      else if (reserved[i].martes == null && block[i].martes != null){
        table[i].martes = '0';
      }
      if (reserved[i].miercoles != null && block[i].miercoles != null){
        table[i].miercoles = '2';
      }
      else if (reserved[i].miercoles != null && block[i].miercoles == null){
        table[i].miercoles = '1';
      }
      else if (reserved[i].miercoles == null && block[i].miercoles != null){
        table[i].miercoles = '0';
      }
      if (reserved[i].jueves != null && block[i].jueves != null){
        table[i].jueves = '2';
      }
      else if (reserved[i].jueves != null && block[i].jueves == null){
        table[i].jueves = '1';
      }
      else if (reserved[i].jueves == null && block[i].jueves != null){
        table[i].jueves = '0';
      }
      if (reserved[i].viernes != null && block[i].viernes != null){
        table[i].viernes = '2';
      }
      else if (reserved[i].viernes != null && block[i].viernes == null){
        table[i].viernes = '1';
      }
      else if (reserved[i].viernes == null && block[i].viernes != null){
        table[i].viernes = '0';
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
