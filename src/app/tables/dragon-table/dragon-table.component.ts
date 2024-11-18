import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Dragon} from '../../dragondto/dragon';
import {Color} from '../../dragondto/color';
import {DragonCharacter} from '../../dragondto/dragoncharacter';
import {NgForOf, NgIf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {Coordinates} from '../../dragondto/coordinates';
import {DragonCave} from '../../dragondto/dragoncave';
import {Country} from '../../dragondto/country';
import {Person} from '../../dragondto/person';
import {Head} from 'rxjs';
import {DragonHead} from '../../dragondto/dragonhead';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {DragonHeadFormComponent} from '../../forms/dragonhead-form/dragon-head-form.component';
import {DragonFormComponent} from '../../forms/dragon-form/dragon-form.component';
import {HeadService} from '../../services/head.service';
import {DragonService} from '../../services/dragon.service';

@Component({
  selector: 'app-dragon-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NzThAddOnComponent,
    NzTableComponent,
    NgIf,
    NzModalComponent,
    NzButtonComponent,
    NzPopconfirmDirective,
    DragonHeadFormComponent,
    DragonFormComponent
  ],
  providers: [NzModalService],
  templateUrl: './dragon-table.component.html',
  styleUrl: './dragon-table.component.css'
})
export class DragonTableComponent {
  private dragonService: DragonService = inject(DragonService);
  @ViewChild(DragonFormComponent) dragonFormComponent!: DragonFormComponent;
  isDragonModalVisible = false;
  dataEdit: Dragon | null;


  listOfDragons: Dragon[] = [
    {
      id: 1,
      name: 'Дракон огня',
      coordinates: {id: 1, x: 10, y: 20, canEdit: true},
      creationDate: '2022-01-01',
      cave: {id: 3, numberOfTreasures: 2, canEdit: true},
      killer: {
        id: 1,
        name: 'Иван Иванов',
        eyeColor: Color.RED,
        hairColor: Color.BROWN,
        location: {id: 1, x: 10, y: 20, z: 30, name: 'Москва', canEdit: true},
        height: 175,
        passportID: '123456789',
        nationality: Country.USA,
        canEdit: true
      },
      age: 100,
      wingspan: 25,
      color: Color.RED,
      character: DragonCharacter.CHAOTIC,
      heads: [
        {id: 1, eyesCount: 10, canEdit: true},
        {id: 2, eyesCount: 30, canEdit: true}],
      canEdit: true
    },
    {
      id: 2,
      name: 'Ледяной дракон',
      coordinates: {id: 1, x: 10, y: 20, canEdit: true},
      creationDate: '2023-05-20',
      cave: {id: 3, numberOfTreasures: 2, canEdit: true},
      killer: null,
      age: 200,
      wingspan: 30,
      color: Color.WHITE,
      character: DragonCharacter.GOOD,
      heads: [
        {id: 4, eyesCount: 10, canEdit: true}],
      canEdit: true
    },
  ];

  constructor(private cd: ChangeDetectorRef) {
    this.dataEdit = null;
  }

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

  //dragon
  deleteRow(id: number): void {
    this.dragonService.deleteDragon(
      {id: id})
      .subscribe((res) => {
        console.log(res);
      })
    this.listOfDragons = this.listOfDragons.filter(d => d.id !== id);
  }


  handleOkHead() {
    this.dragonFormComponent.updateDragon();
  }

  ngAfterViewChecked(): void {
    if (this.dragonFormComponent) {
      if (this.dataEdit) {
        this.dragonFormComponent.setDefaultData(this.dataEdit);
      }
      this.dragonFormComponent.hideAddButtonFn();
    }
    this.cd.detectChanges();

  }

  openEditModal(data: Dragon): void {
    this.isDragonModalVisible = true;
    this.dataEdit = data;

  }


  //coordinates info
  isCoordinatesModalVisible = false;
  selectedCoordinates: Coordinates | null = null;

  openCoordinatesModal(data: Coordinates): void {
    this.selectedCoordinates = data;
    this.isCoordinatesModalVisible = true;
    // this.cd.detectChanges();

  }

  handleCoordinatesCancel(): void {
    this.isCoordinatesModalVisible = false;
  }


  //cave info
  isCaveModalVisible = false;
  selectedCave: DragonCave | null = null;

  openCaveModal(data: DragonCave): void {
    this.selectedCave = data;
    this.isCaveModalVisible = true;

  }

  handleCaveCancel(): void {
    this.isCaveModalVisible = false;
  }


  //killer info
  isKillerModalVisible = false;
  selectedKiller: Person | null = null;

  openKillerModal(data: Person | null): void {
    if (data) {
      this.selectedKiller = data;
      this.isKillerModalVisible = true;
    }


  }

  handleKillerCancel(): void {
    this.isKillerModalVisible = false;
  }


  //heads info
  isHeadsModalVisible = false;
  selectedHeads: DragonHead[] | null = null;

  openHeadsModal(data: DragonHead[] | null): void {
    if (data) {
      this.selectedHeads = data;
      this.isHeadsModalVisible = true;
    }
  }

  handleHeadCancel(): void {
    this.isHeadsModalVisible = false;
  }
}
