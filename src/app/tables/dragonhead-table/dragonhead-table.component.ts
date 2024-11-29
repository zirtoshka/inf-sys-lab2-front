import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {NgForOf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragonHead} from '../../dragondto/dragonhead';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {HeadService} from '../../services/head.service';
import {DragonHeadFormComponent} from '../../forms/dragonhead-form/dragon-head-form.component';
import {CoordinatesFormComponent} from '../../forms/coordinates-form/coordinates-form.component';

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
    DragonHeadFormComponent
  ],
  providers: [NzModalService],
  templateUrl: './dragonhead-table.component.html',
  standalone: true,
  styleUrl: './dragonhead-table.component.css'
})
export class DragonheadTableComponent {
  private headService: HeadService = inject(HeadService);
  @ViewChild(DragonHeadFormComponent) headFormComponent!: DragonHeadFormComponent;
  isHeadModalVisible = false;
  dataEdit: DragonHead | null;


  listOfHeads: DragonHead[] = [
    {id: 1, eyesCount: 10, canEdit: true},
    {id: 2, eyesCount: 30, canEdit: true},
    {id: 3, eyesCount: 2, canEdit: true},
    {id: 4, eyesCount: 30, canEdit: true},
    {id: 5, eyesCount: 2, canEdit: true},
    {id: 6, eyesCount: 30, canEdit: true},
    {id: 7, eyesCount: 2, canEdit: true},
    {id: 8, eyesCount: 30, canEdit: true},
    {id: 9, eyesCount: 2, canEdit: true},
    {id: 10, eyesCount: 30, canEdit: true},
  ];

  constructor(private cd: ChangeDetectorRef) {
    this.dataEdit = null;
  }

  sortOrderId: 'ascend' | 'descend' | null = null;
  sortOrderEyes: 'ascend' | 'descend' | null = null;

  sort(key: 'id' | 'eyesCount'): void {
    if (key === 'id') {
      this.sortOrderId = this.sortOrderId === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'eyesCount') {
      this.sortOrderEyes = this.sortOrderEyes === 'ascend' ? 'descend' : 'ascend';
    }

    this.listOfHeads.sort((a, b) => {
      if (key === 'id') {
        return this.sortOrderId === 'ascend' ? a.id - b.id : b.id - a.id;
      } else if (key === 'eyesCount') {
        const xA = a.eyesCount === null ? -Infinity : a.eyesCount;
        const xB = b.eyesCount === null ? -Infinity : b.eyesCount;
        return this.sortOrderEyes === 'ascend' ? xA - xB : xB - xA;
      }
      return 0;
    });
  }

  searchValue = '';

  onSearch(): void {
    this.listOfHeads = this.listOfHeads.filter(item =>
      item.id.toString().includes(this.searchValue.toLowerCase()) ||
      (item.eyesCount !== null
        && item.eyesCount.toString().includes(this.searchValue)));
  }


  deleteRow(id: number): void {
    this.headService.deleteHead(
      {id: id})
      .subscribe((res) => {
        console.log(res);
      })
    this.listOfHeads = this.listOfHeads.filter(d => d.id !== id);
  }


  handleOkHead() {
    this.headFormComponent.updateHead();
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

}
