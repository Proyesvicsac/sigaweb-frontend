import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComboService {
  constructor(
    public http: HttpClient,
  ) { }

  getComboTipoLabor(): Observable<any>{
    let url = URL_SERVICIOS + '/api/Combo/tipolabor';
    return this.http.get( url  )
        .pipe(
          map( (resp: any) => {
            let info = resp.data;
            return info;
          }),
          catchError(this.handleError)
        );
  }

  getComboDocumentoEntrega(): Observable<any>{
    let url = URL_SERVICIOS + '/api/Combo/tipodocentrega';
    return this.http.get( url  )
        .pipe(
          map( (resp: any) => {
            let info = resp.data;
            return info;
          }),
          catchError(this.handleError)
        );
  }

  getComboTipoCargo(): Observable<any>{
    let url = URL_SERVICIOS + '/api/Combo/tipocargo';
    return this.http.get( url  )
        .pipe(
          map( (resp: any) => {
            let info = resp.data;
            return info;
          }),
          catchError(this.handleError)
        );
  }


  handleError(error: any) {
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
  }
}
