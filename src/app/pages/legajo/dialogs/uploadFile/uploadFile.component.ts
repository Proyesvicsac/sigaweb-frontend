import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalDocumento } from 'src/app/models/personalDocumento.model';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploadFile',
  templateUrl: './uploadFile.component.html',
  styleUrls: ['./uploadFile.component.css']
})
export class UploadFileComponent implements OnInit {

  public files: string[] = [];
  public fileInDownload: string = '';
  public percentage: number = 0;
  public showProgress: boolean = false;
  public showUploadError: boolean = false;
  public msgErrorFile: string = '';
  constructor(
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonalDocumento,
  ) { }

  ngOnInit() {
  }

  public uploadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showUploadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage || 0;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        Swal.fire(
          'SIGA-PRO',
          'Archivo Cargado Excelente!',
          'success'
        );
        this.dialogRef.close(1);
        break;
      case ProgressStatusEnum.ERROR:
        this.dialogRef.close(1);
        this.showProgress = false;
        this.showUploadError = true;
        break;
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  obtenerErrorFile(msj: string){
    this.msgErrorFile = msj;
  }
}
