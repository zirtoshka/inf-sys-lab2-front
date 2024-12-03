import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragonCave} from '../../dragondto/dragoncave';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {CoordinatesFormComponent} from '../../forms/coordinates-form/coordinates-form.component';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {CaveService} from '../../services/cave.service';
import {DragonCaveFormComponent} from '../../forms/dragoncave-form/dragoncave-form.component';
import {WebSocketService} from '../../websocket.service';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzDropDownDirective} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {BaseTableComponent} from '../base-table-component';
import {DtoTable} from '../dto-table';



@Component({
  selector: 'app-dragoncave-table',
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
    DragonCaveFormComponent,
    NzIconDirective,
    NgClass,
    NzDropDownDirective,
    NzMenuItemComponent,
    NzMenuDirective,
    NzRadioComponent,
    NzPaginationComponent,
  ],
  providers: [NzModalService, WebSocketService],
  templateUrl: './dragoncave-table.component.html',
  standalone: true,
  styleUrl: './dragoncave-table.component.css'
})
export class DragoncaveTableComponent extends DtoTable<DragonCave> {

  private caveService = inject(CaveService);
  @ViewChild(DragonCaveFormComponent) caveFormComponent!: DragonCaveFormComponent;
  isEditCaveModalVisible = false;
  dataEdit: DragonCave | undefined;

  sortOrderTreasures: 'TREASURE_ASC' | 'TREASURE_DESC' | null = null;


  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
    this.sortOrder = {
      ID: undefined,
      TREASURE: undefined,
    }
    this.filters = {
      id: undefined,
      canEdit: undefined,
      treasures: undefined,
    };
  }


  loadData(page: number, size: number, sort?: string, filters?: Record<string, any>): void {
    this.caveService.getCaves(page, size, sort,
      filters?.['id'], filters?.['canEdit'],undefined,
      filters?.['treasures']
    ).subscribe({
      next: (response) => {
        this.listOfData = response.content.map(cave => ({
          id: cave.id,
          numberOfTreasures: cave.numberOfTreasures,
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
    this.caveService.deleteCave(
      {id: id})
      .subscribe((res) => {
        console.log(res);
      })
  }


  handleOkCave() {
    this.caveFormComponent.updateCave();
    this.isEditCaveModalVisible = false;
  }

  ngAfterViewChecked(): void {
    if (this.caveFormComponent) {
      if (this.dataEdit) {
        this.caveFormComponent.setDefaultData(this.dataEdit);
      }
      this.caveFormComponent.hideAddButtonFn();
    }
    this.cd.detectChanges();

  }

  openEditModal(data: DragonCave): void {
    this.isEditCaveModalVisible = true;
    this.dataEdit = data;
  }

  getId(item: DragonCave): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return 'caves';
  }

}
