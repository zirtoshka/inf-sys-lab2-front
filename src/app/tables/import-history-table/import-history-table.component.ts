import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
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
import {NzNotificationService} from 'ng-zorro-antd/notification';

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
    NzTableComponent
  ],
  templateUrl: './import-history-table.component.html',
  styleUrl: './import-history-table.component.css'
})
export class ImportHistoryTableComponent extends BaseTableComponent<ImportHistoryData> {
  private baseService = inject(BaseService);

  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
  }

  getId(item: ImportHistoryData): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return "person"; //todo
  }

  loadData(page: number, size: number): void {
    const params = {
      offset: page - 1,
      limit: size.toString(),
    };

    this.baseService.get<Page<ImportHistoryData>>('import/history', params).subscribe({
      next: (response) => {
        this.listOfData = response.content.map(app => ({
          id: app.id,
          userId: app.userId,
          importedCount: app.importedCount,
          status: app.status
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

}
