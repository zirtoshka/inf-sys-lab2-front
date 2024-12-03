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
import {TableStateService} from '../../table-state.service';
import {DragonCave} from '../../dragondto/dragoncave';
import {Subscription} from 'rxjs';

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
    NgClass
  ],
  templateUrl: './admin-app-table.component.html',
  styleUrl: './admin-app-table.component.css'
})
export class AdminAppTableComponent implements OnInit, OnDestroy{
  private tableStateService = inject(TableStateService);
  private applicationsService = inject(ApplicationService);
  private webSocketService = inject(WebSocketService);

  private socketSubscription: Subscription | undefined;

  listOfApplications: Application[] = [];
  dataEdit: Application | null;

  idFilter: number | undefined;
  userIdFilter: number | undefined;
  statusFilter: 'ALL' | 'NEW' | 'CLOSE' | 'APPROVED' | 'CANCELED' = 'ALL';


  sortOrderId: 'ID_ASC' | 'ID_DESC' | null = null;
  sortOrderUserId: 'USER_ASC' | 'USER_DESC' | null = null;
  sortOrderCreatedAt: 'DATE_ASC' | 'DATE_DESC' | null = null;


  currPage: number = 1;
  pageSize: number = 3;
  totalElements = 1000;


  constructor(private cd: ChangeDetectorRef) {
    this.dataEdit = null;
  }

  ngOnInit(): void {
    const state = this.tableStateService.getState('applications');
    this.currPage = state.currentPage;
    this.pageSize = state.pageSize;
    this.loadApplications(this.currPage, this.pageSize);

    this.webSocketService.listen(task => {
       if (task.action === 'UPDATE') {
        this.handleAppUpdate(task.application);
      } else if (task.action === 'ADD') {
        this.handleAppAdd(task.application);
      } else {
        console.log("kokokokko");
      }
    }, "application");
  }
  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  private loadApplications(page: number, size: number, sort?: string, id?: number, userId?: number,
                           createdAt?: string,
                           status?: Status): void {
    this.applicationsService.getApp(page, size, sort, id, userId, createdAt, status).subscribe({
      next: (response) => {
        console.log(response);
        this.listOfApplications = response.content.map(app => ({
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
        console.error('Ошибка загрузки:', err);
      },
    });
  }



  handleAppUpdate(updatedApp: any): void {
    const index = this.listOfApplications.findIndex(app => app.id === updatedApp.id);
    if (index === -1) {
      this.listOfApplications.push(updatedApp);
    } else {
      this.listOfApplications[index] = updatedApp;
    }
    this.cd.detectChanges();
  }

  handleAppAdd(app: Application) {
    this.listOfApplications.push(app);
    this.cd.detectChanges();
  }

  applyFilters(): void {
    this.loadApplications(this.currPage, this.pageSize,
      undefined, this.idFilter, this.userIdFilter);
  }




  resetFilters(): void {
    this.idFilter = undefined;
    this.userIdFilter = undefined;
    this.loadApplications(this.currPage, this.pageSize);
  }


  setStatusFilter(value: 'ALL' | 'NEW' | 'CLOSE' | 'APPROVED' | 'CANCELED'): void {
    this.statusFilter = value;
    this.applyStatusFilter();
  }

  applyStatusFilter(): void {
    if (this.statusFilter === 'ALL') {
      this.loadApplications(this.currPage, this.pageSize);
    } else {
      this.loadApplications(this.currPage, this.pageSize, undefined, undefined,
        undefined, undefined,
        this.statusFilter as Status);
    }
  }


  sort(key: 'id' | 'userId' | 'createdAt'): void {
    if (key === 'id') {
      this.sortOrderId = this.sortOrderId === 'ID_ASC' ? 'ID_DESC' : 'ID_ASC';
      this.loadApplications(this.currPage, this.pageSize, this.sortOrderId);
    } else if (key === 'userId') {
      this.sortOrderUserId = this.sortOrderUserId === 'USER_ASC' ? 'USER_DESC' : 'USER_ASC';
      this.loadApplications(this.currPage, this.pageSize, this.sortOrderUserId);
    } else if (key === 'createdAt') {
      this.sortOrderCreatedAt = this.sortOrderCreatedAt === 'DATE_ASC' ? 'DATE_DESC' : 'DATE_ASC';
      this.loadApplications(this.currPage, this.pageSize, this.sortOrderCreatedAt);
    }
  }

  getSortIcon(property: string): string {
    if (property === 'id') {
      return this.sortOrderId === 'ID_ASC' ? 'up-circle' : this.sortOrderId === 'ID_DESC' ? 'down-circle' : 'down-circle';
    } else if (property === 'userId') {
      return this.sortOrderUserId === 'USER_ASC' ? 'up-circle' : this.sortOrderUserId === 'USER_DESC' ? 'down-circle' : 'down-circle';
    }else if (property === 'createdAt') {
      return this.sortOrderCreatedAt === 'DATE_ASC' ? 'up-circle' : this.sortOrderCreatedAt === 'DATE_DESC' ? 'down-circle' : 'down-circle';
    }
    return 'down-circle';
  }

  onPageChange(page: number): void {
    this.currPage = page;
    this.loadApplications(this.currPage, this.pageSize);
  }
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currPage = 1;
    this.loadApplications(this.currPage, this.pageSize);
  }
}

