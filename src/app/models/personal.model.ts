export class Personal {
  public idPersonal?: number ;
  public apellidoPaterno: string = '';
  public apellidoMaterno: string = '';
  public nombres: string = '';
  public nroDocumento: string = '';
  public fechaCese?: Date | null ;
  public unidad: string = '';
  public estado: string = '';
  public pageNum?: number | 1 = 1;
  public pageSize?: number | 10 = 10;
  public total: number  = 0;
  public isExpand: boolean = false;
}
