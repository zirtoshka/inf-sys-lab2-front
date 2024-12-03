import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DragonCaveFormComponent} from '../../forms/dragoncave-form/dragoncave-form.component';
import {NgClass, NgForOf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalComponent} from 'ng-zorro-antd/modal';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApplicationService} from '../../services/application.service';
import {Application, Status} from '../../application';
import {WebSocketService} from '../../websocket.service';
import {Subscription} from 'rxjs';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzDropDownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {BaseTableComponent} from '../base-table-component';
import {DragonCave} from '../../dragondto/dragoncave';

@Component({
  selector: 'app-admin-app-table',
  standalone: true,
  imports: [
    DragonCaveFormComponent,
    NgForOf,
    NzButtonComponent,
    NzIconDirective,
    NzModalComponent,
    NzPaginationComponent,
    NzPopconfirmDirective,
    NzRadioComponent,
    NzTableComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NzMenuDirective,
    NzMenuItemComponent,
    NzDropDownDirective,
    NzDropdownMenuComponent
  ],
  templateUrl: './admin-app-table.component.html',
  styleUrl: './admin-app-table.component.css'
})
export class AdminAppTableComponent extends BaseTableComponent<Application>{

  statuses: string[] = ['APPROVED', 'CANCELED'];

  private applicationsService = inject(ApplicationService);

  idFilter: number | undefined;
  userIdFilter: number | undefined;
  statusFilter: 'ALL' | 'NEW' | 'CLOSE' | 'APPROVED' | 'CANCELED' = 'ALL';


  sortOrderId: 'ID_ASC' | 'ID_DESC' | null = null;
  sortOrderUserId: 'USER_ASC' | 'USER_DESC' | null = null;
  sortOrderCreatedAt: 'DATE_ASC' | 'DATE_DESC' | null = null;





  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
    this.sortOrder={
      id:undefined,
      userId:undefined,
      createdAt:undefined,
    };
    this.filters={
      id:undefined,
      userId:undefined,
      status:undefined,
    }
  }



  loadData(page: number, size: number, sort?: string, filters?:Record<string, any>): void {
    this.applicationsService.getApp(page, size, sort,
      filters?.['id'], filters?.['userId'], filters?.['createdAt'], filters?.['status'])
      .subscribe({
      next: (response) => {
        this.listOfData = response.content.map(app => ({
          id: app.id,
          userId: app.userId,
          createdAt: app.createdAt,
          status: app.status
        }));
        this.currPage = response.number + 1;
        this.pageSize = response.size;
        this.totalElements = response.totalElements;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err); //todo
      },
    });
  }








  setStatusFilter(value: 'ALL' | 'NEW' | 'CLOSE' | 'APPROVED' | 'CANCELED'): void {
    this.statusFilter = value;
    this.applyStatusFilter();
  }

  applyStatusFilter(): void {
    if (this.statusFilter === 'ALL') {
      this.loadData(this.currPage, this.pageSize);
    } else {
      this.loadData(this.currPage, this.pageSize, undefined, this.filters);
    }
  }




  // getSortIcon(property: string): string {
  //   if (property === 'id') {
  //     return this.sortOrderId === 'ID_ASC' ? 'up-circle' : this.sortOrderId === 'ID_DESC' ? 'down-circle' : 'down-circle';
  //   } else if (property === 'userId') {
  //     return this.sortOrderUserId === 'USER_ASC' ? 'up-circle' : this.sortOrderUserId === 'USER_DESC' ? 'down-circle' : 'down-circle';
  //   } else if (property === 'createdAt') {
  //     return this.sortOrderCreatedAt === 'DATE_ASC' ? 'up-circle' : this.sortOrderCreatedAt === 'DATE_DESC' ? 'down-circle' : 'down-circle';
  //   }
  //   return 'down-circle';
  // }



//todo
  changeStatus(id: number, status: string): void {
    this.applicationsService.updateApp({id, status}).subscribe({
      next: (response) => {
        const app = this.listOfData.find((app) => app.id === id);
        if (app) {
          app.status = response.status;
        }
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка при изменении статуса:', err);
      },
    });
  }

  getId(item: Application): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return 'applications';
  }
}

