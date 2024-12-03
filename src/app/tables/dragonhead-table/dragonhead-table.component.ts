import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragonHead} from '../../dragondto/dragonhead';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {HeadService} from '../../services/head.service';
import {DragonHeadFormComponent} from '../../forms/dragonhead-form/dragon-head-form.component';
import {CoordinatesFormComponent} from '../../forms/coordinates-form/coordinates-form.component';
import {BaseTableComponent} from '../base-table-component';
import {WebSocketService} from '../../websocket.service';
import {DragonCave} from '../../dragondto/dragoncave';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {DtoTable} from '../dto-table';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-dragonhead-table',
  imports: [
    NgForOf,
    NzTableComponent,
    NzThAddOnComponent,
    ReactiveFormsModule,
    FormsModule,
    NzButtonComponent,
    NzPopconfirmDirective,
    CoordinatesFormComponent,
    NzModalComponent,
    DragonHeadFormComponent,
    NzRadioComponent,
    NzIconDirective,
    NgClass
  ],
  providers: [NzModalService,WebSocketService],
  templateUrl: './dragonhead-table.component.html',
  standalone: true,
  styleUrl: './dragonhead-table.component.css'
})
export class DragonheadTableComponent extends DtoTable<DragonHead>{
  private headService: HeadService = inject(HeadService);
  @ViewChild(DragonHeadFormComponent) headFormComponent!: DragonHeadFormComponent;
  isHeadModalVisible = false;
  dataEdit: DragonHead | undefined;

  sortOrderEyes: 'EYES_ASC' | 'EYES_DESC' | null = null;


  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
    this.sortOrder={
      id:undefined,
      eyes:undefined,
    };
    this.filters={
      id:undefined,
      canEdit:undefined,
      eyes:undefined,
    };
  }


  loadData(page: number, size: number, sort?: string, filters?: Record<string, any>): void {
    this.headService.getHeads(page, size, sort,
      filters?.['id'], filters?.['canEdit'],undefined,
      filters?.['eyes']
    ).subscribe({
      next: (response) => {
        this.listOfData = response.content.map(cave => ({
          id: cave.id,
          eyesCount: cave.eyesCount,
          canEdit: cave.canEdit,
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



  deleteRow(id: number): void {
    this.headService.deleteHead(
      {id: id})
      .subscribe((res) => {
        console.log(res);
      })
  }


  handleOkHead() {
    this.headFormComponent.updateHead();
    this.isHeadModalVisible=false;
  }

  ngAfterViewChecked(): void {
    if (this.headFormComponent) {
      if (this.dataEdit) {
        this.headFormComponent.setDefaultData(this.dataEdit);
      }
      this.headFormComponent.hideAddButtonFn();
    }
    this.cd.detectChanges();

  }

  openEditModal(data: DragonHead): void {
    this.isHeadModalVisible = true;
    this.dataEdit = data;
  }

  getId(item: DragonHead): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return 'heads';
  }

}
