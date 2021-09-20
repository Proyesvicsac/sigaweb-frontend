import { UsuarioService } from './../../services/usuario/usuario.service';
import { SidebarService } from './../../services/shared/sidebar.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario | undefined;
  constructor(
    public _sidebarService: SidebarService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
