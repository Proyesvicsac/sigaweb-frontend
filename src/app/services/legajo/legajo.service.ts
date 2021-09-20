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
  providedIn: 'root'
})
export class LegajoService {

  constructor(
    public http: HttpClient
  ) { }
    // Registro de Legajo
  Insert(obj: PersonalDocumento): Observable<any> {
    let url = URL_SERVICIOS + '/api/Legajo/insertLegajoPersonal';
    return this.http.post(url,obj).pipe(
      map((resp: any) => {
        let info: any = resp.data;
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

  Update(obj: PersonalDocumento): Observable<any> {
    let url = URL_SERVICIOS + '/api/Legajo/updateLegajoPersonal';
    return this.http.post(url,obj).pipe(
      map((resp: any) => {
        let info: any = resp.data;
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

  Delete(IdPersonalDocumento: number): Observable<any> {
    let url = URL_SERVICIOS + '/api/Legajo/updateLegajoPersonal?IdPersonalDocumento=' + IdPersonalDocumento;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        let info: any = resp.data;
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
