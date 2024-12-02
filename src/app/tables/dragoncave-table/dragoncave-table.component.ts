import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from '@angular/common';
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
    DragonCaveFormComponent
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
  // filters: todo
  private socketSubscription: Subscription | undefined;

  sortOrderId: 'ID_ASC' | 'ID_DESC' | null = null;
  sortOrderTreasures: 'TREASURE_ASC' | 'TREASURE_DESC' | null = null;

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

  private loadCaves(page: number, size: number, sort?: string): void {
    this.caveService.getCaves(page, size, sort, undefined, undefined).subscribe({
      next: (response) => {
        this.listOfCaves = response.content.map(cave => ({
          id: cave.id,
          numberOfTreasures: cave.numberOfTreasures,
          canEdit: cave.canEdit,
        }));
        this.currPage = response.number;
        this.pageSize = response.size;

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err);
      },
    });
  }

  private loadInitialCaves(): void {
    this.loadCaves(0, 5);
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
      this.loadCaves(0, 5, this.sortOrderId);
    } else if (key === 'numberOfTreasures') {
      this.sortOrderTreasures = this.sortOrderTreasures === 'TREASURE_ASC' ? 'TREASURE_DESC' : 'TREASURE_ASC';
      this.loadCaves(0, 5, this.sortOrderTreasures);
    }
  }



  searchValue = '';
  onSearch(): void {
    this.listOfCaves = this.listOfCaves.filter(item =>
      item.id.toString().includes(this.searchValue.toLowerCase()) ||
      (item.numberOfTreasures !== null
        && item.numberOfTreasures.toString().includes(this.searchValue)));
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
