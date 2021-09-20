export class Usuario {
  constructor(
    public nombreUsuario: string,
    public password: string,
    public nombreCompleto: string,
    public apellidos?: string,
    public nombres?: string,
    public nroDocumento?: string,
    public puesto?: string,
    public tipoUsuario?: string,
    public codigoPersonal?: string,
    public token?: string
  ) {}
}
