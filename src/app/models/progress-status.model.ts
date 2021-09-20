export interface ProgressStatus {
  status: ProgressStatusEnum;
  percentage?: number;
  nameFile?:string;
}

export enum ProgressStatusEnum {
  START, COMPLETE, IN_PROGRESS, ERROR
}
