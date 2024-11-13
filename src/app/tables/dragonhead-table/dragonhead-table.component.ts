import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragonHead} from '../../dragondto/dragonhead';

@Component({
  selector: 'app-dragonhead-table',
  standalone: true,
  imports: [
    NgForOf,
    NzTableComponent,
    NzThAddOnComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './dragonhead-table.component.html',
  styleUrl: './dragonhead-table.component.css'
})
export class DragonheadTableComponent {
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
}
