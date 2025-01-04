export enum StatusImport {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
  FAILED_UPLOAD_FILE='FAILED_UPLOAD_FILE'
}

export interface ImportHistoryData {
  id: number,
  userId: number,
  status: StatusImport,
  importedCount: number,
  fileName: string,

}
