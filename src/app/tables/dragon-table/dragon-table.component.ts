import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Dragon} from '../../dragondto/dragon';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {Coordinates} from '../../dragondto/coordinates';
import {DragonCave} from '../../dragondto/dragoncave';
import {Person} from '../../dragondto/person';
import {DragonHead} from '../../dragondto/dragonhead';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {DragonHeadFormComponent} from '../../forms/dragonhead-form/dragon-head-form.component';
import {DataType, DragonFormComponent} from '../../forms/dragon-form/dragon-form.component';
import {DragonService} from '../../services/dragon.service';
import {DragonEditFormComponent} from '../../forms/dragon-edit-form/dragon-edit-form.component';
import {DtoTable} from '../dto-table';
import {WebSocketService} from '../../websocket.service';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {CoordinatesService} from '../../services/coordinates.service';
import {CaveService} from '../../services/cave.service';
import {HeadService} from '../../services/head.service';
import {PersonService} from '../../services/person.service';

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

  isInternalModalVisible = {
    [DataType.COORD]: false,
    [DataType.CAVE]: false,
    [DataType.KILLER]: false,
    [DataType.HEADS]: false,
  }

  selectedCave: DragonCave | null = null;
  selectedCoordinates: Coordinates | null = null;
  selectedKiller: Person | null = null;
  selectedHeads: DragonHead[] | null = [];

  selectedInternalData = {
    [DataType.COORD]: this.selectedCoordinates,
    [DataType.CAVE]: this.selectedCave,
    [DataType.KILLER]: this.selectedKiller,
    [DataType.HEADS]: this.selectedHeads,
  }

  private coordService = inject(CoordinatesService);
  private caveService = inject(CaveService);
  private headsService = inject(HeadService);
  private personService = inject(PersonService);
  serviceGetFnMap = {
    [DataType.COORD]: this.coordService.getCoordinates.bind(this.coordService),
    [DataType.CAVE]: this.caveService.getCaves.bind(this.caveService),
    [DataType.HEADS]: this.headsService.getHeads.bind(this.headsService),
    [DataType.KILLER]: this.personService.getPersons.bind(this.personService),
  };

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
    console.log(this.listOfData + "dfsdflfkkd")
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
          coordinates: null,
          coordinatesId: dragon.coordinatesId,
          creationDate: dragon.creationDate,
          cave: null,
          caveId: dragon.caveId,
          killer: dragon.killer,
          killerId: dragon.killerId,
          age: dragon.age,
          wingspan: dragon.wingspan,
          color: dragon.color,
          character: dragon.character,
          heads: null,
          headIds: dragon.headIds,
          canEdit: dragon.canEdit
        }));
        console.log(this.listOfData);
        this.currPage = response.number + 1;
        this.pageSize = response.size;
        this.totalElements = response.totalElements;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err); //todo
      },
    });
    console.log("end loading")
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
    // this.formComponent.updateDragon();
    this.isEditModalVisible = false;
  }


  getId(item: Dragon): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return 'dragons';
  }


  handleInternalCancel(type: DataType): void {
    this.isInternalModalVisible[type] = false;
  }


  openInternalDataModal(type: DataType, id: number): void {
    const getFn: any = this.serviceGetFnMap[type];
    getFn(undefined,
      undefined,
      undefined,
      id.toString()).subscribe({
      next: (response: any) => {
        const data = response.content[0];
        if (data) {
          this.selectedInternalData[type] = data;
        } else {
          this.selectedInternalData[type] = null;
        }
      },
      error: (err: any) => {
        console.error('Ошибка загрузки:', err); //todo
      },
    });
    this.isInternalModalVisible[type] = true;

  }

  openHeadsModal(type: DataType, ids: number[]): void {
    const getFn: any = this.serviceGetFnMap[type];
    for (let i = 0, l = ids.length; i < l; i++) {
      getFn(undefined,
        undefined,
        undefined,
        ids[i].toString()).subscribe({
        next: (response: any) => {
          const data = response.content[0];
          if (data) {
            if (this.selectedInternalData[DataType.HEADS] == null) {
              this.selectedInternalData[DataType.HEADS] = []
            }
            this.selectedInternalData[DataType.HEADS].push(data);
          } else {
            this.selectedInternalData[DataType.HEADS] = [];
          }
        },
        error: (err: any) => {
          console.error('Ошибка загрузки:', err); //todo
        },
      });
    }
    console.log(this.selectedInternalData)
    this.isInternalModalVisible[type] = true;

  }


  protected readonly DataType = DataType;
}
