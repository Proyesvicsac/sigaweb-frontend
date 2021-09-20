import { Injectable } from '@angular/core';

import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

constructor(
  public http: HttpClient
) { }

  public uploadFile(file: Blob, fileLast: string = '', id: number = 0): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file);
    let url = URL_SERVICIOS + '/api/UploadFile/upload?nameLast=' + fileLast + '&idDocumento='+ id;
    return this.http.request(new HttpRequest(
      'POST',
      url,
      formData,
      {
        reportProgress: true
      }));
  }

  public downloadFile(file: string): Observable<HttpEvent<Blob>> {
    let url = URL_SERVICIOS + '/api/UploadFile/download'
    return this.http.request(new HttpRequest(
      'GET',
      `${url}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }


}
