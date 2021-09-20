import { UploadService } from './../../../../services/shared/upload.service';
import { LegajoService } from './../../../../services/legajo/legajo.service';
import { PersonalDocumento } from './../../../../models/personalDocumento.model';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboService } from 'src/app/services/service.index';
import { Combo } from 'src/app/models/Combo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addlegajos',
  templateUrl: './addlegajos.component.html',
  styleUrls: ['./addlegajos.component.css'],
})
export class AddlegajosComponent implements OnInit {
  listDocumentoEntrega: Combo[] = [];
  listTipoCargo: Combo[] = [];
  listTipoLabor: Combo[] = [];



  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddlegajosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonalDocumento,
    public _comboService: ComboService,
    public _legajoService: LegajoService,
    public _uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this._comboService.getComboDocumentoEntrega().subscribe((lst: Combo[]) => {
      this.listDocumentoEntrega = lst;
    });

    this._comboService.getComboTipoCargo().subscribe((lst: Combo[]) => {
      this.listTipoCargo = lst;
    });

    this._comboService.getComboTipoLabor().subscribe((lst: Combo[]) => {
      this.listTipoLabor = lst;
    });
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.data);
    if (
      this.data.idPersonalDocumento === 0 ||
      this.data.idPersonalDocumento === undefined
    ) {
      this._legajoService.Insert(this.data).subscribe((res) => {
        if (res === 1) {
          Swal.fire('SIGA-PRO', 'Documentación Agregada', 'success');
          this.dialogRef.close(1);
        } else {
          Swal.fire(
            'SIGA-PRO',
            'Problemas al Registras el Documento',
            'warning'
          );
          this.dialogRef.close(0);
        }
      });
    } else if (this.data.idPersonalDocumento > 0) {
      this._legajoService.Update(this.data).subscribe((res) => {
        if (res === 1) {
          Swal.fire(
            'SIGA-PRO',
            'Documentación Actualizada',
            'success'
          );
          this.dialogRef.close(1);
        } else {
          this.dialogRef.close(0);
          Swal.fire(
            'SIGA-PRO',
            'Problemas al Actualizar el Documento',
            'warning'
          );
        }
      });
    }
  }
}
