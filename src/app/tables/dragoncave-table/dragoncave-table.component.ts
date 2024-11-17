import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-dragoncave-table',
  standalone: true,
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
  providers: [NzModalService],
  templateUrl: './dragoncave-table.component.html',
  styleUrl: './dragoncave-table.component.css'
})
export class DragoncaveTableComponent {
  private caveService = inject(CaveService);
  @ViewChild(DragonCaveFormComponent) caveFormComponent!: DragonCaveFormComponent;
  isCaveModalVisible = false;
  dataEdit: DragonCave | null;

  listOfCaves: DragonCave[] = [
    {id: 1, numberOfTreasures: 10, canEdit: true},
    {id: 2, numberOfTreasures: 30, canEdit: true},
    {id: 3, numberOfTreasures: 2, canEdit: true},
    {id: 4, numberOfTreasures: 30, canEdit: true},
    {id: 5, numberOfTreasures: 2, canEdit: true},
    {id: 6, numberOfTreasures: 30, canEdit: true},
    {id: 7, numberOfTreasures: 2, canEdit: true},
    {id: 8, numberOfTreasures: 30, canEdit: true},
    {id: 9, numberOfTreasures: 2, canEdit: true},
    {id: 10, numberOfTreasures: 30, canEdit: true},
  ];

  constructor(private cd: ChangeDetectorRef) {
    this.dataEdit = null;
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
