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
export class DragoncaveTableComponent implements OnInit, OnDestroy {
  private tableStateService = inject(TableStateService);
  private webSocketService = inject(WebSocketService);

  private caveService = inject(CaveService);
  @ViewChild(DragonCaveFormComponent) caveFormComponent!: DragonCaveFormComponent;
  isEditCaveModalVisible = false;
  dataEdit: DragonCave | null;

  listOfCaves: DragonCave[] = [];
  currPage: number = 1;
  pageSize: number = 3;
  private socketSubscription: Subscription | undefined;

  sortOrderId: 'ID_ASC' | 'ID_DESC' | null = null;
  sortOrderTreasures: 'TREASURE_ASC' | 'TREASURE_DESC' | null = null;
  canEditFilter: 'all' | 'true' | 'false' = 'all';


  idFilter: number | undefined;
  treasuresFilter: number | undefined ;


  totalElements = 1000;

  constructor(private cd: ChangeDetectorRef) {
    this.dataEdit = null;
  }

  ngOnInit(): void {
    const state = this.tableStateService.getState('dragoncave');
    this.currPage = state.currentPage;
    this.pageSize = state.pageSize;
    this.loadInitialCaves();

    this.webSocketService.listen(task => {
      if (task.action === 'DELETE') {
        this.handleCaveDelete(task.id);
      } else if (task.action === 'UPDATE') {
        this.handleCaveUpdate(task.cave);
      } else if (task.action === 'ADD') {
        this.handleCaveAdd(task.cave);
      } else {
        console.log("kokokokko");
      }
    });
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  private loadCaves(page: number, size: number, sort?: string, id?:number, canEdit?:boolean, numberOfTreasures?:number ): void {
    this.caveService.getCaves(page, size, sort, id, canEdit,undefined, numberOfTreasures).subscribe({
      next: (response) => {
        console.log(response);
        this.listOfCaves = response.content.map(cave => ({
          id: cave.id,
          numberOfTreasures: cave.numberOfTreasures,
          canEdit: cave.canEdit,
        }));
        this.currPage = response.number+1;
        this.pageSize = response.size;
        this.totalElements = response.totalElements;


        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err);
      },
    });
  }

  private loadInitialCaves(): void {
    this.loadCaves(this.currPage, this.pageSize);
  }


  handleCaveDelete(deletedCaveId: number): void {
    this.listOfCaves = this.listOfCaves.filter(cave => cave.id !== deletedCaveId);
    this.cd.detectChanges();
  }

  handleCaveUpdate(updatedCave: any): void {
    const index = this.listOfCaves.findIndex(cave => cave.id === updatedCave.id);
    if (index === -1) {
      this.listOfCaves.push(updatedCave);
    } else {
      this.listOfCaves[index] = updatedCave;
    }
    this.cd.detectChanges();

  }

  handleCaveAdd(cave: DragonCave) {
    this.listOfCaves.push(cave);
    this.cd.detectChanges();

  }




  sort(key: 'id' | 'numberOfTreasures'): void {
    if (key === 'id') {
      this.sortOrderId = this.sortOrderId === 'ID_ASC' ? 'ID_DESC' : 'ID_ASC';
      this.loadCaves(this.currPage, this.pageSize, this.sortOrderId);
    } else if (key === 'numberOfTreasures') {
      this.sortOrderTreasures = this.sortOrderTreasures === 'TREASURE_ASC' ? 'TREASURE_DESC' : 'TREASURE_ASC';
      this.loadCaves(this.currPage, this.pageSize, this.sortOrderTreasures);
    }
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

  applyFilters(): void {
    this.loadCaves(this.currPage, this.pageSize, undefined, this.idFilter,undefined, this.treasuresFilter);
  }

  resetFilters(): void {
    this.idFilter = undefined;
    this.treasuresFilter = undefined;
    this.loadCaves(this.currPage, this.pageSize);
  }


  applyCanEditFilter(): void {
    if (this.canEditFilter === 'all') {
      this.loadCaves(this.currPage, this.pageSize);
    } else {
      const filterValue = this.canEditFilter === 'true';
      this.loadCaves(this.currPage, this.pageSize,undefined,undefined, filterValue);
    }
  }

  onPageChange(page: number): void {
    console.log(page, "it's page", this.currPage);
    this.currPage = page;
    console.log("now", this.currPage);
    this.loadCaves(this.currPage, this.pageSize);
  }
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currPage = 1;
    this.loadCaves(this.currPage, this.pageSize);
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




}
