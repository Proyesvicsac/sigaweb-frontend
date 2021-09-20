import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddlegajosComponent } from './dialogs/addlegajos/addlegajos.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { UploadFileComponent } from './dialogs/uploadFile/uploadFile.component';
@NgModule({
  declarations: [
    AddlegajosComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class LegajoModule { }
