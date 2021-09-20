import { HttpEventType } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ProgressStatus,
  ProgressStatusEnum,
} from 'src/app/models/progress-status.model';
import { UploadService } from 'src/app/services/service.index';
import { textSpanIsEmpty } from 'typescript';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  nombreDocumento: string = '';
  @Input() public disabled: boolean | undefined;
  @Input() public id: number | undefined;
  @Input() public fileLast: string | undefined;
  @Output() public uploadStatusComponent: EventEmitter<ProgressStatus>;
  @Output() public isFileExists: EventEmitter<boolean>;
  @Output() public documentFile: EventEmitter<File>;
  @Output() public errorUploadFail: EventEmitter<string>;

  @ViewChild('inputFile') inputFile: ElementRef | undefined;
  constructor(private service: UploadService) {
    this.uploadStatusComponent = new EventEmitter<ProgressStatus>();
    this.isFileExists = new EventEmitter<boolean>(false);
    this.documentFile = new EventEmitter<File>();
    this.errorUploadFail = new EventEmitter<string>();
  }

  ngOnInit() {
    this.nombreDocumento = this.fileLast!;
  }
  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      var mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this.errorUploadFail!.emit('Solo se aceptan Imagenes');
        this.isFileExists!.emit(false);
      } else {
        this.nombreDocumento = file.name;
        this.documentFile!.emit(file);
        this.isFileExists!.emit(true);
        this.uploadStatusComponent!.emit({ status: ProgressStatusEnum.START });
        this.service.uploadFile(file, this.fileLast, this.id).subscribe(
          (data: any) => {
            if (data) {
              switch (data.type) {
                case HttpEventType.UploadProgress:
                  this.uploadStatusComponent!.emit({
                    status: ProgressStatusEnum.IN_PROGRESS,
                    percentage: Math.round((data.loaded / data.total) * 100),
                  });
                  break;
                case HttpEventType.Response:
                  this.inputFile!.nativeElement.value = '';
                  this.uploadStatusComponent!.emit({
                    status: ProgressStatusEnum.COMPLETE,
                    nameFile: data.body.newNameFile,
                  });
                  break;
              }
            }
          },
          (error) => {
            this.inputFile!.nativeElement.value = '';
            this.uploadStatusComponent!.emit({
              status: ProgressStatusEnum.ERROR,
            });
          }
        );
      }
    } else {
      this.isFileExists!.emit(false);
    }
  }
}
