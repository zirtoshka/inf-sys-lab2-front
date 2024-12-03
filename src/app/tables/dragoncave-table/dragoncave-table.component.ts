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
import {TableStateService} from '../../table-state.service';
import {Subscription} from 'rxjs';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzDropDownDirective} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {BaseTableComponent} from '../base-table-component';



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
export class DragoncaveTableComponent extends BaseTableComponent<DragonCave> {

  private caveService = inject(CaveService);
  @ViewChild(DragonCaveFormComponent) caveFormComponent!: DragonCaveFormComponent;
  isEditCaveModalVisible = false;
  dataEdit: DragonCave | undefined;

  sortOrderId: 'ID_ASC' | 'ID_DESC' | null = null;
  sortOrderTreasures: 'TREASURE_ASC' | 'TREASURE_DESC' | null = null;
  canEditFilter: 'all' | 'true' | 'false' = 'all';


  idFilter: number | undefined;
  treasuresFilter: number | undefined;

  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
    this.sortOrder = {
      id: null,
      treasures: null,
    }
    this.filters = {
      id: undefined,
      canEdit: undefined,
      treasures: undefined,
    };
  }


  loadData(page: number, size: number, sort?: string, filters?: Record<string, any>): void {
    this.caveService.getCaves(page, size, sort,
      filters?.['id'], filters?.['canEdit'],
      filters?.['treasures']
    ).subscribe({
      next: (response) => {
        console.log(response);
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
        console.error('Ошибка загрузки:', err);
      },
    });
  }




  getSortIcon(property: string): string {
    if (property === 'id') {
      return this.sortOrderId === 'ID_ASC' ? 'up-circle' : this.sortOrderId === 'ID_DESC' ? 'down-circle' : 'down-circle';
    } else if (property === 'numberOfTreasures') {
      return this.sortOrderTreasures === 'TREASURE_ASC' ? 'up-circle' : this.sortOrderTreasures === 'TREASURE_DESC' ? 'down-circle' : 'down-circle';
    }
    return 'down-circle';
  }

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
    return 'cave';
  }

}
