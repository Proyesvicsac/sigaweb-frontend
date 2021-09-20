import { RouterModule, Routes } from '@angular/router';
// components
import { LegajoComponent } from './legajo/legajo.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const pagesRoutes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent,
    data: { titulo: 'Dashboard' ,  breadcrumb: 'Dashboard'}
  },
  { path: 'legajos', component: LegajoComponent, data: { titulo : 'Mantenimiento de Legajos',  breadcrumb: 'Bandeja de Legajos'} },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
