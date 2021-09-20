import { Breadcrumb } from './../../models/breadcrumb';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { ResponseApi } from '../../models/response.model';
import Swal from 'sweetalert2'
import { throwError } from 'rxjs';

@Injectable()
export class UsuarioService {
  usuario: Usuario | undefined;
  token: string = '';
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
  ) { this.cargarStorage(); }

    login(user: Usuario, recordar: Boolean = false){
      if ( recordar ) {
        localStorage.setItem('usuario_evicsac', user.nombreUsuario );
      }else {
        localStorage.removeItem('usuario_evicsac');
      }

      let url = URL_SERVICIOS + '/api/Usuario/Authenticate';
      console.log(user);
      return this.http.post( url, user )
      .pipe(
        map( (resp: any) => {
          let info = resp.data;
          this.guardarStorage( info.codigoPersonal, info.token, info, info.menu );
          return true;
        }),
        catchError(this.handleError)
      );
    }

    renuevaToken() {

      let url = URL_SERVICIOS + '/api/Usuario/refreshtoken';
      url += '?Token=' + this.token;

      return this.http.get( url )
      .pipe(
        map((resp: any) => {
          this.token = (resp.data !== null && resp.data !== undefined) ? resp.data .token : '' ;
          localStorage.setItem('token', this.token );
          console.log('Token renovado');

          return true;
        }),
        catchError((err: HttpErrorResponse) => {
          let errorMessage = '';
          if (err.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${err.error.message}`;
          } else {
              // server-side error
              errorMessage = `Error Status: ${err.status}\nMessage: ${err.message}`;
          }
          Swal.fire( 'No se pudo renovar token', 'No fue posible renovar token', 'error' );
          return throwError(errorMessage);
        })
      );
    }

    handleError(error: any) {
      var rest = new ResponseApi<Usuario>();
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

    logout() {
      this.usuario = undefined;
      this.token = '';
      this.menu = [];

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('menu');

      this.router.navigate(['/login']);
    }

    guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

      localStorage.setItem('id', id );
      localStorage.setItem('token', token );
      localStorage.setItem('usuario', JSON.stringify(usuario) );
      localStorage.setItem('menu', JSON.stringify((menu !== null && menu !== undefined) ? menu : '' ));

      this.usuario = usuario;
      this.token = token;
      this.menu = menu;
    }

    cargarStorage() {

      if ( localStorage.getItem('token')) {
        this.token = localStorage.getItem('token') || '' ;
        this.usuario = JSON.parse( localStorage.getItem('usuario') || '' );
        let lmenu = (localStorage.getItem('menu') !== null && localStorage.getItem('menu') !== undefined) ? localStorage.getItem('menu') : '';
        this.menu = JSON.parse(lmenu || '');
      } else {
        this.token = '';
        this.usuario = undefined;
        this.menu = [];
      }

    }

    estaLogueado():boolean {
      return ( this.token.length > 5 ) ? true : false;
    }
    getToken() {
      return localStorage.getItem('token');
    }
}
