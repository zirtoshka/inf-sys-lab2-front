import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDropDownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {BaseTableComponent} from '../base-table-component';
import {Application} from '../../application';
import {ImportHistoryData, StatusImport} from '../../import-history-data';
import {Page} from '../../page';
import {ApplicationService} from '../../services/application.service';
import {BaseService} from '../../services/base.service';
import {WebSocketService} from '../../websocket.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-import-history-table',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NzButtonComponent,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzIconDirective,
    NzMenuDirective,
    NzMenuItemComponent,
    NzPaginationComponent,
    NzRadioComponent,
    NzTableComponent,
    NgClass
  ],
  templateUrl: './import-history-table.component.html',
  styleUrl: './import-history-table.component.css'
})
export class ImportHistoryTableComponent extends BaseTableComponent<ImportHistoryData> {
  private baseService = inject(BaseService);
  idFilter: number | undefined;
  userIdFilter: number | undefined;
  statusFilter: 'ALL' | 'SUCCESS' | 'IN_PROGRESS' | 'FAILED'  = 'ALL';

  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
    this.sortOrder={
      id:undefined,
      userId:undefined,
      importedCount:undefined,
    };
    this.filters={
      id:undefined,
      userId:undefined,
      status:undefined,
    }
  }

  getId(item: ImportHistoryData): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return "person"; //todo
  }

  setStatusFilter(value: 'ALL' | 'SUCCESS' | 'IN_PROGRESS' | 'FAILED'): void {
    this.statusFilter = value;
    this.applyStatusFilter();
  }
  applyStatusFilter(): void {
    if (this.statusFilter === 'ALL') {
      this.filters['status'] = undefined;
      this.loadData(this.currPage, this.pageSize);
    } else {
      this.filters['status'] = this.statusFilter;
      this.loadData(this.currPage, this.pageSize, undefined, this.filters);
    }
  }

  loadData(page: number, size: number, sort?: string, filters?:Record<string, any>): void {
    const params = {
      offset: page - 1,
      limit: size.toString(),
      sort: sort,
      id: filters?.['id'],
      userId: filters?.['userId'],
      status: filters?.['status']
    };

    console.log(params)
    this.baseService.get<Page<ImportHistoryData>>('import/history', params).subscribe({
      next: (response) => {
        this.listOfData = response.content.map(app => ({
          id: app.id,
          userId: app.userId,
          importedCount: app.importedCount,
          status: app.status,
          fileUrl:app.fileUrl
        }));
        this.currPage = response.number + 1;
        this.pageSize = response.size;
        this.totalElements = response.totalElements;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notificationService.error(
          "oops", 'Ошибка загрузки(('
        )
        console.error('Ошибка загрузки:', err);
      },
    });
  }

  protected readonly StatusImport = StatusImport;


  download(id: number): void {
    this.baseService.delete(
      {id: id}, "import/download/")
      .subscribe((res) => {
        console.log(res);
      })
  }

}
