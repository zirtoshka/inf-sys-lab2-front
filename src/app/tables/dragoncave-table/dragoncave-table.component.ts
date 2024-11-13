import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragonCave} from '../../dragondto/dragoncave';
import {ca_ES} from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-dragoncave-table',
  standalone: true,
  imports: [
    NgForOf,
    NzTableComponent,
    NzThAddOnComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './dragoncave-table.component.html',
  styleUrl: './dragoncave-table.component.css'
})
export class DragoncaveTableComponent {
  listOfCaves: DragonCave[] = [
    {id: 1, numberOfTreasures: 10,canEdit: true},
    {id: 2, numberOfTreasures: 30,canEdit: true},
    {id: 3, numberOfTreasures: 2,canEdit: true},
    {id: 4, numberOfTreasures: 30,canEdit: true},
    {id: 5, numberOfTreasures: 2,canEdit: true},
    {id: 6, numberOfTreasures: 30,canEdit: true},
    {id: 7, numberOfTreasures: 2,canEdit: true},
    {id: 8, numberOfTreasures: 30,canEdit: true},
    {id: 9, numberOfTreasures: 2,canEdit: true},
    {id: 10, numberOfTreasures: 30,canEdit: true},
  ];

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

  protected readonly ca_ES = ca_ES;
}
