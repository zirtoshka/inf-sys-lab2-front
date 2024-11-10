import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Location} from '../../dragondto/location';

@Component({
  selector: 'app-location-table',
  standalone: true,
  imports: [
    NgForOf,
    NzPaginationComponent,
    NzTableComponent,
    NzThAddOnComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './location-table.component.html',
  styleUrl: './location-table.component.css'
})
export class LocationTableComponent {
  listOfLocations: Location[] = [
    { id: 1, x: 10, y: 20, z: 30, name: 'A' },
    { id: 2, x: 15, y: 25, z: 35, name: 'B' },
    { id: 3, x: 20, y: 30, z: 40, name: 'C' },
    { id: 4, x: 25, y: 35, z: 45, name: 'D' },
    { id: 5, x: 30, y: 40, z: 50, name: 'E' },
    { id: 6, x: 35, y: 45, z: 55, name: 'F' },
    { id: 7, x: 40, y: 50, z: 60, name: 'G' },
  ];

  sortOrderId: 'ascend' | 'descend' | null = null;
  sortOrderX: 'ascend' | 'descend' | null = null;
  sortOrderY: 'ascend' | 'descend' | null = null;
  sortOrderZ: 'ascend' | 'descend' | null = null;
  sortOrderName: 'ascend' | 'descend' | null = null;

  sort(key: 'id' | 'x' | 'y' | 'z' | 'name'): void {
    if (key === 'id') {
      this.sortOrderId = this.sortOrderId === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'x') {
      this.sortOrderX = this.sortOrderX === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'y') {
      this.sortOrderY = this.sortOrderY === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'z') {
      this.sortOrderZ = this.sortOrderZ === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'name') {
      this.sortOrderName = this.sortOrderName === 'ascend' ? 'descend' : 'ascend';
    }

    this.listOfLocations.sort((a, b) => {
      if (key === 'id') {
        return this.sortOrderId === 'ascend' ? a.id - b.id : b.id - a.id;
      } else if (key === 'x') {
        const xA = a.x === null ? -Infinity : a.x;
        const xB = b.x === null ? -Infinity : b.x;
        return this.sortOrderX === 'ascend' ? xA - xB : xB - xA;
      } else if (key === 'y') {
        return this.sortOrderY === 'ascend' ? a.y - b.y : b.y - a.y;
      } else if (key === 'z') {
        return this.sortOrderZ === 'ascend' ? a.z - b.z : b.z - a.z;
      } else if (key === 'name') {
        return this.sortOrderName === 'ascend' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return 0;
    });
  }

  searchValue = '';

  onSearch(): void {
    this.listOfLocations = this.listOfLocations.filter(item =>
      item.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      (item.x !== null && item.x.toString().includes(this.searchValue)) ||
      item.y.toString().includes(this.searchValue) ||
      item.z.toString().includes(this.searchValue)
    );
  }
}
