import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { InfoSalaComponent } from 'app/info-sala/info-sala.component';
import { RequestComponent } from '../../request/request.component'
import { LaboratoriosComponent } from 'app/laboratorios/laboratorios.component';
import { HorarioComponent } from 'app/horario/horario.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'info-sala/:rid',      component: InfoSalaComponent },
    { path: 'solicitudes',      component: RequestComponent },
    { path: 'laboratorios', component: LaboratoriosComponent},
    { path: 'horario',      component: HorarioComponent},
];
