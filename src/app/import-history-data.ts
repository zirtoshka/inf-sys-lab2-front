export enum StatusImport {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS'
}

export interface ImportHistoryData {
  id: number,
  userId: number,
  status: StatusImport,
  importedCount: number
}
