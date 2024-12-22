import {ChangeDetectorRef, Directive, inject, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription} from 'rxjs';
import {WebSocketService} from '../websocket.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Directive()
export abstract class BaseTableComponent<T> implements OnInit, OnDestroy {
  protected notificationService = inject(NzNotificationService);

  listOfData: T[] = [];
  currPage: number = 1;
  pageSize: number = 3;
  totalElements: number = 0;


  sortOrder: Record<string, string | undefined> = {};
  filters: Record<string, any> = {};


  private socketSubscription: Subscription | undefined;

  protected constructor(
    protected cd: ChangeDetectorRef,
    protected webSocketService: WebSocketService,
  ) {
  }

  abstract loadData(
    page: number,
    size: number,
    sort?: string,
    filter?: Record<string, any>
  ): void;

  ngOnInit() {
    this.loadData(this.currPage, this.pageSize);
    this.socketSubscription = this.webSocketService.listen(
      (task) => this.handleWebSocketEvent(task),
      this.getWebSocketTopic()
    );
  }

  ngOnDestroy() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }


  protected handleWebSocketEvent(task: any): void {
    if (task.action === 'ADD') {
      this.listOfData.push(task.data);
    } else if (task.action === 'UPDATE') {
      const index = this.listOfData.findIndex((item) => this.getId(item) === this.getId(task.data));
      if (index !== -1) {
        this.listOfData[index] = task.data;
      }
    } else if (task.action === 'DELETE') {
      this.listOfData = this.listOfData.filter((item) => this.getId(item) !== task.id);
    }
    if (task.action === 'IMPORT') {
      this.listOfData = [...this.listOfData, ...task.data]; //todo
    }
    this.cd.detectChanges();
  }


  onPageChange(page: number): void {
    this.currPage = page;
    this.loadData(this.currPage, this.pageSize);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currPage = 1;
    this.loadData(this.currPage, this.pageSize);
  }

  sort(key: string): void {
    key = key.toUpperCase();
    this.sortOrder[key] = this.sortOrder[key] === `${key}_ASC` ? `${key}_DESC` : `${key}_ASC`;
    this.loadData(this.currPage, this.pageSize, this.sortOrder[key], this.filters);
  }

  getSortIcon(property: string): string {
    const stateSort = this.sortOrder[property];
    if (stateSort && stateSort.includes('ASC')) return 'up-circle';
    if (stateSort && stateSort.includes('DESC')) return 'down-circle';
    return 'up-circle';
  }

  applyFilters(): void {
    this.loadData(this.currPage, this.pageSize, undefined, this.filters);
  }

  resetFilters(): void {
    this.filters = {};
    this.loadData(this.currPage, this.pageSize);
  }

  abstract getWebSocketTopic(): string;

  abstract getId(item: T): any;

}
