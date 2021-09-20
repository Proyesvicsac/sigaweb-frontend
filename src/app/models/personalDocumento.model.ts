export class PersonalDocumento {
  public idPersonalDocumento: number = 0;
  public idPersonal: number = 0 ;
  public idDocumentoEntrega: number = 0 ;
  public idTipoCargo: number = 0 ;
  public idTipoLabor: number = 0 ;
  public tipoDocumentoEntrega: string = '' ;
  public tipoCargo: string = '' ;
  public tipoLabor: String = '' ;
  public fechaEmision?: Date | null;
  public fechaCaducacion?: Date|null ;
  public numero?: string ;
  public glosa?: string;
  public nombresPersonal: string = '';
  public Usuario: string = '';
  public nameFile: string = '';
}
