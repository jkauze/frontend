import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { InfoSalaComponent } from 'app/info-sala/info-sala.component';
import { RequestComponent } from '../../request/request.component';
import { MatTableModule } from '@angular/material/table';
import { UserTypePipe } from 'app/pipes/user-type.pipe';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialog,
  MatDialogModule
} from '@angular/material';
import { LaboratoriosComponent } from 'app/laboratorios/laboratorios.component';
import { HorarioComponent } from 'app/horario/horario.component';
import { SalasUserComponent } from 'app/laboratorios/salas-user/salas-user.component';
import { ReservaComponent } from 'app/reserva/reserva.component';
import { DialogSemanasEspecificasComponent } from 'app/dialogs/dialog-semanas-especificas.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
  ],
  declarations: [
    DashboardComponent,
    InfoSalaComponent,
    RequestComponent,
    UserTypePipe,
    LaboratoriosComponent,
    HorarioComponent,
    SalasUserComponent,
    ReservaComponent,
    DialogSemanasEspecificasComponent,
  ],
  entryComponents: [
    DialogSemanasEspecificasComponent,
  ]
})

export class AdminLayoutModule {}
