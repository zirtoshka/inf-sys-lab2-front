export enum Status {
  NEW='NEW',
  CLOSE='CLOSE',
  APPROVED='APPROVED',
  CANCELED='CANCELED'
}

export interface Application {
  id: number;
  userId: number;
  createdAt: string;
  status: Status;
}
