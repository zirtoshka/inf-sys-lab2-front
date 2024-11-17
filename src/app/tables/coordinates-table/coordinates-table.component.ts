import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Coordinates} from '../../dragondto/coordinates';

import {FormsModule} from '@angular/forms';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NgForOf} from '@angular/common';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {CoordinatesFormComponent} from '../../forms/coordinates-form/coordinates-form.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-coordinates-table',
  standalone: true,
  imports: [
    NzTableComponent,
    NzThAddOnComponent,
    NzPaginationComponent,
    NgForOf,
    FormsModule,
    NzPopconfirmDirective,
    NzInputDirective,
    CoordinatesFormComponent,
    NzButtonComponent,
    NzModalComponent,

  ],
  providers: [NzModalService],
  templateUrl: './coordinates-table.component.html',
  styleUrl: './coordinates-table.component.css'
})
export class CoordinatesTableComponent implements OnInit {
  @ViewChild(CoordinatesFormComponent) coordinatesFormComponent!: CoordinatesFormComponent;
  isCoordinatesModalVisible = false;

  listOfCoordinates: Coordinates[] = [
    { id: 1, x: 10, y: 20 ,canEdit: true},
    { id: 2, x: 15, y: 25 ,canEdit: true},
    { id: 3, x: 20, y: 30 ,canEdit: true},
    { id: 4, x: 25, y: 35 ,canEdit: true},
    { id: 5, x: 30, y: 40,canEdit: true },
    { id: 6, x: 35, y: 45 ,canEdit: true},
    { id: 7, x: 40, y: 50,canEdit: true },
  ];

  sortOrderId: 'ascend' | 'descend' | null = null;
  sortOrderX: 'ascend' | 'descend' | null = null;
  sortOrderY: 'ascend' | 'descend' | null = null;

  constructor( private cd: ChangeDetectorRef) {
  }

  sort(key: 'id' | 'x' | 'y'): void {
    if (key === 'id') {
      this.sortOrderId = this.sortOrderId === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'x') {
      this.sortOrderX = this.sortOrderX === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'y') {
      this.sortOrderY = this.sortOrderY === 'ascend' ? 'descend' : 'ascend';
    }

    this.listOfCoordinates.sort((a, b) => {
      if (key === 'id') {
        return this.sortOrderId === 'ascend' ? a.id - b.id : b.id - a.id;
      } else if (key === 'x') {
        return this.sortOrderX === 'ascend' ? a.x - b.x : b.x - a.x;
      } else if (key === 'y') {
        return this.sortOrderY === 'ascend' ? a.y - b.y : b.y - a.y;
      }
      return 0;
    });
  }

  searchValue = '';

  onSearch(): void {
    this.listOfCoordinates = this.listOfCoordinates.filter(item =>
      item.x.toString().includes(this.searchValue) || item.y.toString().includes(this.searchValue)
    );
  }


  deleteRow(id: number): void {
    this.listOfCoordinates = this.listOfCoordinates.filter(d => d.id !== id);
  }

  //todo
  editCache: { [key: string]: { edit: boolean; data: Coordinates } } = {};
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }


  cancelEdit(id: number): void {
    const index = this.listOfCoordinates.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfCoordinates[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfCoordinates.findIndex(item => item.id === id);
    Object.assign(this.listOfCoordinates[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }
  updateEditCache(): void {
    this.listOfCoordinates.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
  ngOnInit(): void {
    this.updateEditCache()
  }

  handleOkCoordinates(){
    let data = this.coordinatesFormComponent.getFormData();
    console.log(data);
  }
  ngAfterViewChecked(): void {
    if (this.coordinatesFormComponent) {
      this.coordinatesFormComponent.hideAddButtonFn();
    }
    this.cd.detectChanges();

  }
}
