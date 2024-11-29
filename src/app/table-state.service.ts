import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface TableState {
  currentPage: number;
  pageSize: number;
  filters: { [key: string]: any };
}

@Injectable({
  providedIn: 'root'
})
export class TableStateService {
  private tableState = new Map<string, TableState>();

  constructor() {}

  getState(tableKey: string): TableState {
    if (!this.tableState.has(tableKey)) {
      this.tableState.set(tableKey, {
        currentPage: 1,
        pageSize: 10,
        filters: {}
      });
    }
    return this.tableState.get(tableKey)!;
  }

  setState(tableKey: string, state: TableState): void {
    this.tableState.set(tableKey, state);
  }
}
