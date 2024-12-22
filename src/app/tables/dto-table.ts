import {BaseTableComponent} from './base-table-component';
import {
  AfterViewChecked,
  Directive,
  ViewChild
} from '@angular/core';
import {FormEditable} from '../forms/form';
import {Location} from '../dragondto/location';

@Directive()
export abstract class DtoTable<T> extends BaseTableComponent<T> implements AfterViewChecked {
  isEditModalVisible = false;
  @ViewChild('formComponent') formComponent!: FormEditable<T>;

  dataEdit: T | undefined;


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
    this.loadData(this.currPage, this.pageSize, undefined, this.filters);
  }

  abstract deleteRow(id: number): void;

  abstract handleOk(): void;

  openEditModal(data: T): void {
    this.showEditModal(data);
    setTimeout(() => {
      this.formComponent.setDefaultData(this.dataEdit);
    }, 10);
    this.formComponent.setDefaultData(this.dataEdit);
  }

  showEditModal(data: T) {
    this.isEditModalVisible = true;
    this.dataEdit = data;
  }


  ngAfterViewChecked(): void {
    if (this.formComponent) {
      this.formComponent.hideAddButtonFn();
    }
    this.cd.detectChanges();
  }

}
