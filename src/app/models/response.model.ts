export class ResponseApi<T>{
  public data: T | undefined;
  public isSuccess: boolean = false;
  public message: string = '' ;
}
