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
  MatSelectModule
} from '@angular/material';

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
  ],
  declarations: [
    DashboardComponent,
    InfoSalaComponent,
    RequestComponent,
    UserTypePipe,
  ]
})

export class AdminLayoutModule {}
