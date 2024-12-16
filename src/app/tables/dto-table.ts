import {BaseTableComponent} from './base-table-component';
import {Directive, ViewChild} from '@angular/core';

@Directive()
export abstract class DtoTable<T> extends BaseTableComponent<T> {
  isEditModalVisible = false;
  @ViewChild('formComponent') formComponent!: any;
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

  abstract handleOk():void;

  // handleOk() {
  //   this.formComponent.updateCave();
  //   this.isEditModalVisible = false;
  // }



  openEditModal(data: T): void {
    this.isEditModalVisible = true;
    this.dataEdit = data;
  }


  ngAfterViewChecked(): void {
    if (this.formComponent) {
      if (this.dataEdit) {
        this.formComponent.setDefaultData(this.dataEdit);
      }
      this.formComponent.hideAddButtonFn();
    }
    this.cd.detectChanges();
  }

}
