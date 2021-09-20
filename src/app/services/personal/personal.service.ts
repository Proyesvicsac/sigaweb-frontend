import { PersonalDocumento } from './../../models/personalDocumento.model';
import { Personal } from './../../models/personal.model';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  constructor(public http: HttpClient) {}

  // Servicio de Obtencion del Personal
  getPersonal(obj: Personal): Observable<Personal[]> {
    let url = URL_SERVICIOS + '/api/Legajo/personal';
    return this.http.post(url,obj).pipe(
      map((resp: any) => {
        let info: Personal[] = resp.data
            .map( (item : Personal) =>{
              item.fechaCese = (item.fechaCese == null) ? null : new Date(item.fechaCese)
              return item;
            });

        return info;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          if (error.error != null) {
            Swal.fire('SIGA-PRO', error.error.message, 'error');
          } else {
            Swal.fire('SIGA-PRO', error.message, 'error');
          }
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  // Servicio de Obtencion del Personal Documento
  getPersonalDocumento(idPersonal: number): Observable<PersonalDocumento[]> {
    let url = URL_SERVICIOS + '/api/Legajo/personalDocumentos?IdPersonal=' + idPersonal;
    return this.http.get(url).pipe(
      map((resp: any) => {
        let info: PersonalDocumento[] = resp.data
            .map( (item : PersonalDocumento) =>{
              item.fechaEmision = (item.fechaEmision == null) ? null : new Date(item.fechaEmision);
              item.fechaCaducacion = (item.fechaCaducacion == null) ? null : new Date(item.fechaCaducacion);
              return item;
            });

        return info;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          if (error.error != null) {
            Swal.fire('SIGA-PRO', error.error.message, 'error');
          } else {
            Swal.fire('SIGA-PRO', error.message, 'error');
          }
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
