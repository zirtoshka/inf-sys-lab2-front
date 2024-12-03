import {BaseTableComponent} from './base-table-component';

export abstract class DtoTable<T> extends BaseTableComponent<T>{
  canEditFilter: 'all' | 'true' | 'false' = 'all';

  setCanEditFilter(value: 'all' | 'true' | 'false'): void {
    this.canEditFilter = value;
    this.applyCanEditFilter();
  }

  applyCanEditFilter(): void {
    if (this.canEditFilter === 'all') {
      this.filters['canEdit'] = undefined;
    } else {
      this.filters['canEdit'] = this.canEditFilter === 'true';
    }
    this.loadData(this.currPage, this.pageSize, undefined,  this.filters);
  }
}
