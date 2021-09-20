import { UploadComponent } from './../components/upload/upload.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { PAGES_ROUTES } from './pages-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// Imports
import { SharedModule } from '../shared/shared.module';
// Components
import { LegajoComponent } from './legajo/legajo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../shared/material/material/material.module';
import { LegajoModule } from './legajo/legajo.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    LegajoComponent
  ],
  exports:[
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LegajoModule,
    ComponentsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
