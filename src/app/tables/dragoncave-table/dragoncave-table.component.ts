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
  isCaveModalVisible = false;
  dataEdit: DragonCave | null;

  listOfCaves: DragonCave[] = [];
  currPage: number = 1;
  pageSize: number = 3;
  // filters: todo
  private socketSubscription: Subscription | undefined;


  constructor(private cd: ChangeDetectorRef) {
    this.dataEdit = null;
  }

  ngOnInit(): void {
    const state = this.tableStateService.getState('dragoncave');
    this.currPage = state.currentPage;
    this.pageSize = state.pageSize;

    this.socketSubscription = this.webSocketService.getCavesUpdates().subscribe((message: any) => {
      if (message.body) {
        const updatedCave = JSON.parse(message.body);
        this.handleCaveUpdate(updatedCave);
      }
    });
  }


  handleCaveUpdate(updatedCave: any): void {
    const index = this.listOfCaves.findIndex(cave => cave.id === updatedCave.id);
    if (index === -1) {
      // Если пещера не найдена, добавляем новую
      this.listOfCaves.push(updatedCave);
    } else {
      // Если пещера уже существует, обновляем ее данные
      this.listOfCaves[index] = updatedCave;
    }
  }


  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }




  sortOrderId: 'ascend' | 'descend' | null = null;
  sortOrderTreasures: 'ascend' | 'descend' | null = null;

  sort(key: 'id' | 'numberOfTreasures'): void {
    if (key === 'id') {
      this.sortOrderId = this.sortOrderId === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'numberOfTreasures') {
      this.sortOrderTreasures = this.sortOrderTreasures === 'ascend' ? 'descend' : 'ascend';
    }

    this.listOfCaves.sort((a, b) => {
      if (key === 'id') {
        return this.sortOrderId === 'ascend' ? a.id - b.id : b.id - a.id;
      } else if (key === 'numberOfTreasures') {
        const xA = a.numberOfTreasures === null ? -Infinity : a.numberOfTreasures;
        const xB = b.numberOfTreasures === null ? -Infinity : b.numberOfTreasures;
        return this.sortOrderTreasures === 'ascend' ? xA - xB : xB - xA;
      }
      return 0;
    });
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
    this.listOfCaves = this.listOfCaves.filter(d => d.id !== id);
  }


  handleOkCave() {
    this.caveFormComponent.updateCave();
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
    this.isCaveModalVisible = true;
    this.dataEdit = data;

  }


}
