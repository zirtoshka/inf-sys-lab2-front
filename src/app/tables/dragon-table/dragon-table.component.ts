import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Dragon} from '../../dragondto/dragon';
import {Color} from '../../dragondto/color';
import {DragonCharacter} from '../../dragondto/dragoncharacter';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {Coordinates} from '../../dragondto/coordinates';
import {DragonCave} from '../../dragondto/dragoncave';
import {Country} from '../../dragondto/country';
import {Person} from '../../dragondto/person';
import {DragonHead} from '../../dragondto/dragonhead';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {DragonHeadFormComponent} from '../../forms/dragonhead-form/dragon-head-form.component';
import {DragonFormComponent} from '../../forms/dragon-form/dragon-form.component';
import {DragonService} from '../../services/dragon.service';
import {DragonEditFormComponent} from '../../forms/dragon-edit-form/dragon-edit-form.component';
import {DtoTable} from '../dto-table';
import {WebSocketService} from '../../websocket.service';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-dragon-table',
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
    DragonFormComponent,
    DragonEditFormComponent,
    NzPaginationComponent,
    NzRadioComponent,
    NzIconDirective,
    NgClass
  ],
  providers: [NzModalService, WebSocketService],
  templateUrl: './dragon-table.component.html',
  standalone: true,
  styleUrl: './dragon-table.component.css'
})
export class DragonTableComponent extends DtoTable<Dragon> {
  private dragonService: DragonService = inject(DragonService);
  @ViewChild(DragonEditFormComponent) declare formComponent: DragonEditFormComponent;

  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
    this.sortOrder = {
      id: undefined,
      name: undefined,
      coord: undefined,
      date: undefined,
      cave: undefined,
      person: undefined,
      age: undefined,
      wingspan: undefined,
      color: undefined,
      character: undefined,
      heads: undefined, //todo no ideas
    };
    this.filters = {
      id: undefined,
      name: undefined,
      coordinatesId: undefined,
      userId: undefined,
      creationDate: undefined,
      caveId: undefined,
      killerId: undefined,
      age: undefined,
      wingspan: undefined,
      color: undefined,
      character: undefined,
      headCount: undefined, //todo no ideas
    }
  }

  loadData(page: number, size: number, sort?: string, filters?: Record<string, any>): void {
    this.dragonService.getDragons(page, size, sort,
      filters?.['id'], filters?.['canEdit'], undefined,
      filters?.['name'], filters?.['coordinatesId'],
      filters?.['creationDate'],
      filters?.['caveId'],
      filters?.['killerId'],
      filters?.['age'],
      filters?.['wingspan'],
      filters?.['color'],
      filters?.['character'],
      filters?.['headCount']
    ).subscribe({
      next: (response) => {
        this.listOfData = response.content.map(dragon => ({
          id: dragon.id,
          name: dragon.name,
          coordinates: dragon.coordinates,
          creationDate: dragon.creationDate,
          cave: dragon.cave,
          killer: dragon.killer,
          age: dragon.age,
          wingspan: dragon.wingspan,
          color: dragon.color,
          character: dragon.character,
          heads: dragon.heads,
          canEdit: dragon.canEdit
        }));
        this.currPage = response.number + 1;
        this.pageSize = response.size;
        this.totalElements = response.totalElements;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err); //todo
      },
    });
  }


  //dragon
  deleteRow(id: number): void {
    this.dragonService.deleteDragon(
      {id: id})
      .subscribe((res) => {
        console.log(res);
      })
  }
  handleOk() {
    this.formComponent.updateDragon();
    this.isEditModalVisible = false;
  }


  getId(item: Dragon): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return 'dragons';
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
