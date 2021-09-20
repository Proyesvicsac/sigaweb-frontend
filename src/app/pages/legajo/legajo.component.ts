import { UploadFileComponent } from './dialogs/uploadFile/uploadFile.component';
import { PersonalDocumento } from './../../models/personalDocumento.model';
import { Personal } from './../../models/personal.model';
import { ComboService } from './../../services/combo/combo.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { PersonalService, UploadService } from 'src/app/services/service.index';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AddlegajosComponent } from './dialogs/addlegajos/addlegajos.component';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { reduce } from 'rxjs/operators';
import { LegajoService } from 'src/app/services/legajo/legajo.service';

@Component({
  selector: 'app-legajo',
  templateUrl: './legajo.component.html',
  styleUrls: ['./legajo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2,1)')
      ),
    ]),
  ],
})
export class LegajoComponent implements OnInit, AfterViewInit {
  length = 0;
  pageNumber = 1;
  displayedColumns: string[] = [
    'expand',
    'actions',
    'idPersonal',
    'apellidoPaterno',
    'apellidoMaterno',
    'nombres',
    'nroDocumento',
    'fechaCese',
    'unidad',
  ];
  displayedColumnsSecondTable = [
    'actions',
    'index',
    'tipoDocumentoEntrega',
    'tipoCargo',
    'tipoLabor',
    'fechaEmision',
    'fechaCaducacion',
    'numero',
  ];

  gridData: Personal[] = [];
  gridDataDocumento: PersonalDocumento[] = [];
  dataSource = new MatTableDataSource<Personal>();
  dataSourceDetail: any = [];
  isChecked = true;
  filterData = { nombres: '', nroDocumento: '', isActive: true };

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private _personalService: PersonalService,
    public _uploadService: UploadService,
    public _legajoService: LegajoService,
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator || null;
  }

  ngOnInit(): void {
    this.getPersonal();
  }

  // Obtiendo el Personal
  getPersonal() {
    let mPersonal: Personal = new Personal();
    mPersonal.nombres = this.filterData.nombres;
    mPersonal.nroDocumento = this.filterData.nroDocumento;
    mPersonal.estado = this.filterData.isActive ? 'A' : 'I';
    (mPersonal.pageNum =
      this.paginator === undefined ? 1 : this.paginator.pageIndex + 1),
      (mPersonal.pageSize =
        this.paginator === undefined || this.paginator.pageSize === undefined
          ? 10
          : this.paginator.pageSize);
    this._personalService
      .getPersonal(mPersonal)
      .subscribe((lst: Personal[]) => {
        this.gridData = lst;

        this.dataSource = new MatTableDataSource(this.gridData);
        this.length = this.gridData?.length === 0 ? 0 : this.gridData[0].total;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator || null;
        });
      });
  }
  pageChanged(event: any) {
    console.log(event);
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;
    this.getPersonal();
  }
  // Cargar Nuevo Legajo
  nuevoLegajo(personal: Personal) {
    let pDocumento = new PersonalDocumento();
    pDocumento.nombresPersonal = personal.nombres;
    pDocumento.idPersonal = personal.idPersonal || 0;
    const dialogRef = this.dialog.open(AddlegajosComponent, {
      data: pDocumento,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        console.log('resultado despues de grabar el legajo');
      } else {
        console.log('error al registrar');
      }
    });
  }

  editLegajo(personal: PersonalDocumento) {
    const dialogRef = this.dialog.open(AddlegajosComponent, {
      data: personal,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getPersonal();
      } else {
        this.getPersonal();
      }
    });
  }

  deleteLegajo(personal: PersonalDocumento) {
    Swal.fire({
      title: 'SIGA-PRO',
      text: '¿Desea Eliminar el Documento?',
      cancelButtonColor: '#d33',
      confirmButtonColor: '',
      cancelButtonText: 'Cancelar',
      confirmButtonText:'Confirmar',
      showCloseButton: true,
      icon: 'question'
    }).then((result:any) =>{
      if (result.value) {
        this._legajoService.Delete(personal.idPersonalDocumento).subscribe((res) => {
          if (res === 1) {
            Swal.fire(
              'SIGA-PRO',
              'Documento Eliminado',
              'success'
            );
          } else {
            Swal.fire(
              'SIGA-PRO',
              'Problemas al Eliminar el Documento',
              'warning'
            );
          }
        });
      }
    });
  }

  // Mostrando el detalle
  expandCollapse(row: Personal, index: number) {
    row.isExpand = row.isExpand === true ? false : true;
    this._personalService
      .getPersonalDocumento(row.idPersonal!)
      .subscribe((lst: PersonalDocumento[]) => {
        this.gridDataDocumento = lst;
        this.dataSourceDetail[index] =
          new MatTableDataSource<PersonalDocumento>() || [];
        this.dataSourceDetail[index].data = this.gridDataDocumento;
      });
  }

  // Descargando archivo
  public download(nameFile: string) {
    this._uploadService.downloadFile(nameFile).subscribe(
      (data: any) => {
        switch (data.type) {
          case HttpEventType.Response:
            const downloadedFile = new Blob([data.body], {
              type: data.body.type,
            });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = nameFile;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      (error) => {
        console.log('error download file', error);
        Swal.fire(
          'SIGA-PRO',
          'Hay Problemas al Descargar el Archivo',
          'warning'
        );
      }
    );
  }

  uploadFile(personal: PersonalDocumento) {
    const dialogRef = this.dialog.open(UploadFileComponent, {
      data: personal,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getPersonal();
      } else {
        this.getPersonal();
      }
    });
  }
}
