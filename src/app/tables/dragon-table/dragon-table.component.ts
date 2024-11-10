import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Dragon} from '../../dragondto/dragon';
import {Color} from '../../dragondto/color';
import {DragonCharacter} from '../../dragondto/dragoncharacter';
import {NgForOf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-dragon-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NzThAddOnComponent,
    NzTableComponent
  ],
  templateUrl: './dragon-table.component.html',
  styleUrl: './dragon-table.component.css'
})
export class DragonTableComponent {
  listOfDragons: Dragon[] = [
    {
      id: 1,
      name: 'Дракон огня',
      coordinates: { id: 1, x: 10, y: 20 },
      creationDate: '2022-01-01',
      cave: {id: 3, numberOfTreasures: 2},
      killer: null,
      age: 100,
      wingspan: 25,
      color: Color.RED,
      character: DragonCharacter.CHAOTIC
    },
    {
      id: 2,
      name: 'Ледяной дракон',
      coordinates: { id: 1, x: 10, y: 20 },
      creationDate: '2023-05-20',
      cave: {id: 3, numberOfTreasures: 2},
      killer: null,
      age: 200,
      wingspan: 30,
      color: Color.WHITE,
      character: DragonCharacter.GOOD
    },
  ];

  sortOrderId: 'ascend' | 'descend' | null = null;
  sortOrderName: 'ascend' | 'descend' | null = null;
  sortOrderCoordinates: 'ascend' | 'descend' | null = null;
  sortOrderCreationDate: 'ascend' | 'descend' | null = null;
  sortOrderCave: 'ascend' | 'descend' | null = null;
  sortOrderKiller: 'ascend' | 'descend' | null = null;
  sortOrderAge: 'ascend' | 'descend' | null = null;
  sortOrderWingspan: 'ascend' | 'descend' | null = null;
  sortOrderColor: 'ascend' | 'descend' | null = null;
  sortOrderCharacter: 'ascend' | 'descend' | null = null;

  sort(key: keyof Dragon): void {
    if (key === 'id') {
      this.sortOrderId = this.sortOrderId === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'name') {
      this.sortOrderName = this.sortOrderName === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'coordinates') {
      this.sortOrderCoordinates = this.sortOrderCoordinates === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'creationDate') {
      this.sortOrderCreationDate = this.sortOrderCreationDate === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'cave') {
      this.sortOrderCave = this.sortOrderCave === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'killer') {
      this.sortOrderKiller = this.sortOrderKiller === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'age') {
      this.sortOrderAge = this.sortOrderAge === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'wingspan') {
      this.sortOrderWingspan = this.sortOrderWingspan === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'color') {
      this.sortOrderColor = this.sortOrderColor === 'ascend' ? 'descend' : 'ascend';
    } else if (key === 'character') {
      this.sortOrderCharacter = this.sortOrderCharacter === 'ascend' ? 'descend' : 'ascend';
    }

    this.listOfDragons.sort((a, b) => {
      if (key === 'id') {
        return this.sortOrderId === 'ascend' ? a.id - b.id : b.id - a.id;
      } else if (key === 'name') {
        return this.sortOrderName === 'ascend' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (key === 'coordinates') {
        return this.sortOrderCoordinates === 'ascend' ? a.coordinates.x - b.coordinates.x : b.coordinates.x - a.coordinates.x;
      } else if (key === 'creationDate') {
        return this.sortOrderCreationDate === 'ascend' ? new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime() : new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
      } else if (key === 'killer') {
        return this.sortOrderKiller === 'ascend' ? (a.killer?.name || '').localeCompare(b.killer?.name || '') : (b.killer?.name || '').localeCompare(a.killer?.name || '');
      } else if (key === 'age') {
        return this.sortOrderAge === 'ascend' ? (a.age || 0) - (b.age || 0) : (b.age || 0) - (a.age || 0);
      } else if (key === 'wingspan') {
        return this.sortOrderWingspan === 'ascend' ? (a.wingspan || 0) - (b.wingspan || 0) : (b.wingspan || 0) - (a.wingspan || 0);
      } else if (key === 'color') {
        return this.sortOrderColor === 'ascend' ? a.color.localeCompare(b.color) : b.color.localeCompare(a.color);
      } else if (key === 'character') {
        return this.sortOrderCharacter === 'ascend' ? a.character.localeCompare(b.character) : b.character.localeCompare(a.character);
      }
      return 0;
    });
  }

  searchValue = '';
  onSearch(): void {
    this.listOfDragons = this.listOfDragons.filter(dragon =>
      dragon.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      dragon.id.toString().includes(this.searchValue.toLowerCase())
    );
  }
}
