import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { MaterialModule } from '../shared/material/material/material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    UploadComponent
  ],
  exports : [
    UploadComponent
  ]
})
export class ComponentsModule { }
