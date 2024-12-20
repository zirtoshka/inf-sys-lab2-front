import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Color} from '../../dragondto/color';
import {Location} from '../../dragondto/location';
import {Coordinates} from '../../dragondto/coordinates';
import {DragonCave} from '../../dragondto/dragoncave';
import {DragonCharacter} from '../../dragondto/dragoncharacter';
import {DragonHead} from '../../dragondto/dragonhead';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NgForOf, NgIf} from '@angular/common';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {PersonFormComponent} from '../person-form/person-form.component';
import {CoordinatesFormComponent} from '../coordinates-form/coordinates-form.component';
import {DragonCaveFormComponent} from '../dragoncave-form/dragoncave-form.component';
import {DragonHeadFormComponent} from '../dragonhead-form/dragon-head-form.component';
import {DragonService} from '../../services/dragon.service';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {Dragon} from '../../dragondto/dragon';
import {FormEditable} from '../form';
import {CoordinatesService} from '../../services/coordinates.service';
import {CaveService} from '../../services/cave.service';
import {Person} from '../../dragondto/person';
import {HeadService} from '../../services/head.service';
import {BaseService} from '../../services/base.service';
import {PersonService} from '../../services/person.service';
import {Country} from '../../dragondto/country';
import {forkJoin} from 'rxjs';

export enum DataType {
  COORD = 'coord',
  CAVE = 'cave',
  KILLER = 'killer',
  HEADS = 'heads'
}

@Component({
  selector: 'app-dragon-form',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NgForOf,
    NzOptionComponent,
    NzSelectComponent,
    NgIf,
    NzDividerComponent,
    NzSwitchComponent,
    FormsModule,
    NzButtonComponent,
    NzModalComponent,
    PersonFormComponent,
    CoordinatesFormComponent,
    DragonCaveFormComponent,
    DragonHeadFormComponent,
    NzIconDirective
  ],
  providers: [NzModalService],
  templateUrl: './dragon-form.component.html',
  styleUrl: './dragon-form.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DragonFormComponent extends FormEditable<Dragon> implements AfterViewChecked {
  @ViewChild(PersonFormComponent) personFormComponent!: PersonFormComponent;
  @ViewChild(CoordinatesFormComponent) coordinatesFormComponent!: CoordinatesFormComponent;
  @ViewChild(DragonCaveFormComponent) caveFormComponent!: DragonCaveFormComponent;
  @ViewChild(DragonHeadFormComponent) headFormComponent!: DragonHeadFormComponent;

  private dragonService = inject(DragonService);

  showAddButton = true;
  defaultData: Dragon | undefined;


  isInternalModalVisible = {
    [DataType.COORD]: false,
    [DataType.CAVE]: false,
    [DataType.KILLER]: false,
    [DataType.HEADS]: false,
  }

  validateForm: FormGroup;

  existingCoordinates: Coordinates[] = [];
  existingCaves: DragonCave[] = [];
  existingHeads: DragonHead[] = []
  existingPersons: Person[] = []

  // existingInternalData = {
  //   [DataType.COORD]: this.existingCoordinates,
  //   [DataType.CAVE]: this.existingCaves,
  //   [DataType.KILLER]:this.existingPersons,
  //   [DataType.HEADS]: this.existingHeads,
  // }

  upgradeExistingInternalData(type: DataType, updated: any) {
    if (type === DataType.COORD) {
      this.existingCoordinates = [...this.existingCoordinates, ...updated]
    } else if (type === DataType.CAVE) {
      this.existingCaves = [...this.existingCaves, ...updated]
    } else if (type === DataType.KILLER) {
      this.existingPersons = [...this.existingPersons, ...updated]
    } else if (type === DataType.HEADS) {
      this.existingHeads = [...this.existingHeads, ...updated]
    }
  }

  resetExistingInternalData(type: DataType) {
    if (type === DataType.COORD) {
      this.existingCoordinates = []
    } else if (type === DataType.CAVE) {
      this.existingCaves = []
    } else if (type === DataType.KILLER) {
      this.existingPersons = []
    } else if (type === DataType.HEADS) {
      this.existingHeads = []
    }
  }


  loadingState = {
    [DataType.COORD]: false,
    [DataType.CAVE]: false,
    [DataType.KILLER]: false,
    [DataType.HEADS]: false,

  };
  allLoaded = {
    [DataType.COORD]: false,
    [DataType.CAVE]: false,
    [DataType.KILLER]: false,
    [DataType.HEADS]: false,
  }
  searchValue = {
    [DataType.COORD]: '',
    [DataType.CAVE]: '',
    [DataType.KILLER]: '',
    [DataType.HEADS]: '',
  };

  offset = {
    [DataType.COORD]: 0,
    [DataType.CAVE]: 0,
    [DataType.KILLER]: 0,
    [DataType.HEADS]: 0,
  };
  limit = {
    [DataType.COORD]: 2,
    [DataType.CAVE]: 2,
    [DataType.KILLER]: 2,
    [DataType.HEADS]: 2,
  };
  colors = Object.values(Color);

  characters = Object.values(DragonCharacter);

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

  constructor(private fb: NonNullableFormBuilder, private cd: ChangeDetectorRef) {
    super();
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      coordinates: [null, [Validators.required]],
      cave: [null, [Validators.required]],
      killer: [null],
      age: ['', [Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      wingspan: ['', [Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      color: [null, [Validators.required]],
      character: [null, [Validators.required]],
      heads: [[], [Validators.required]],
      canEdit: [false, [Validators.required]],
    })
  }

  ngAfterViewChecked(): void {
    if (this.personFormComponent) {
      this.personFormComponent.hideAddButtonFn();
    }
    if (this.caveFormComponent) {
      this.caveFormComponent.hideAddButtonFn();
    }
    if (this.headFormComponent) {
      this.headFormComponent.hideAddButtonFn();
    }
    if (this.coordinatesFormComponent) {
      this.coordinatesFormComponent.hideAddButtonFn();
    }
    this.cd.detectChanges();

  }

  addDragon() {
    if (this.validateForm.valid) {
      this.dragonService.addDragon(this.validateForm.value)
        .subscribe((data: any) => {
          console.log(data);
        })
    }

  }

  // updateDragon() {
  //   if (this.validateForm.valid && this.defaultData) {
  //     const head: Dragon = {
  //       age: this.defaultData.age,
  //       cave: this.defaultData.cave,
  //       character: this.defaultData.character,
  //       color: this.defaultData.color,
  //       coordinates: this.defaultData.coordinates,
  //       creationDate: this.defaultData.creationDate,
  //       heads: this.defaultData.heads,
  //       killer: this.defaultData.killer,
  //       wingspan: this.defaultData.wingspan,
  //       id: this.defaultData.id,
  //       name: this.validateForm.value.eyes,
  //       canEdit: this.validateForm.value.canEdit
  //     };
  //     this.dragonService.updateDragon(
  //       head
  //     ).subscribe((data: Dragon) => {
  //       console.log(data);
  //     })
  //   }
  // }


  handleInternalCancel(type: DataType): void {
    this.isInternalModalVisible[type] = false;
  }


  setDefaultData(data: Dragon | undefined) {
    this.defaultData = data;

    let coordFormData: Coordinates | null = null;
    let caveFormData: DragonCave | null = null;
    let killerFormData: Person | null = null;
    let headsFormData: DragonHead[] = [];

    if (data?.coordinatesId) {
      this.coordService.getCoordinates(
        undefined,
        undefined, undefined, data?.coordinatesId.toString()
      ).subscribe({
          next: (response) => {
            this.upgradeExistingInternalData(DataType.COORD, response.content);
            coordFormData = this.existingCoordinates[this.existingCoordinates.length - 1]
            this.setDataInForm(data, coordFormData, caveFormData, killerFormData, headsFormData);
          }
        }
      );
    }

    if (data?.killerId) {
      this.personService.getPersons(
        undefined,
        undefined, undefined, data?.killerId.toString()
      ).subscribe({
          next: (response) => {
            this.upgradeExistingInternalData(DataType.KILLER, response.content);
            killerFormData = this.existingPersons[this.existingPersons.length - 1]
            this.setDataInForm(data, coordFormData, caveFormData, killerFormData, headsFormData);

          }
        }
      );
    }

    if (data?.caveId) {
      this.caveService.getCaves(
        undefined,
        undefined, undefined, data?.caveId.toString()
      ).subscribe({
          next: (response) => {
            this.upgradeExistingInternalData(DataType.CAVE, response.content);
            caveFormData = this.existingCaves[this.existingCaves.length - 1]
            this.setDataInForm(data, coordFormData, caveFormData, killerFormData, headsFormData);
          }
        }
      );
    }

    if (data?.headIds) {
      const requests = data.headIds.map(id =>
        this.headsService.getHeads(undefined, undefined, undefined, id.toString())
      );

      forkJoin(requests).subscribe({
        next: (responses) => {
          responses.forEach((response, index) => {
            this.upgradeExistingInternalData(DataType.HEADS, response.content);
            const headToAdd = this.existingHeads[this.existingHeads.length - 1];
            headsFormData.push(headToAdd);
          });
          this.setDataInForm(data, coordFormData, caveFormData, killerFormData, headsFormData);
        },
        error: (err) => {
          console.error('Ошибка загрузки голов:', err);
        }
      });
    }

  }

  handleInternalDataOk(type: DataType): void {
    this.allLoaded[type] = false;

    switch (type) {
      case DataType.KILLER:
        this.personFormComponent.addPerson();
        break;
      case DataType.COORD:
        this.coordinatesFormComponent.addCoordinates();
        break;
      case DataType.CAVE:
        this.caveFormComponent.addCave();
        break;
      case DataType.HEADS:
        this.headFormComponent.addHead();
        break;
      default:
        throw new Error('Unknown type');
    }
    this.handleInternalCancel(type);
  }


  isInternalFormValid(type
                        :
                        DataType
  ) {
    let formComponent;
    switch (type) {
      case DataType.KILLER:
        formComponent = this.personFormComponent;
        break;
      case DataType.COORD:
        formComponent = this.coordinatesFormComponent;
        break;
      case DataType.CAVE:
        formComponent = this.caveFormComponent;
        break;
      case DataType.HEADS:
        formComponent = this.headFormComponent;
        break;
      default:
        throw new Error('Unknown type');
    }

    return formComponent ? formComponent.validateForm.valid : false;
  }

  hideAddButtonFn() {
    this.personFormComponent.hideAddButtonFn();
    this.coordinatesFormComponent.hideAddButtonFn();
    this.caveFormComponent.hideAddButtonFn();
    this.headFormComponent.hideAddButtonFn();
  }


  loadInternalData(dataType
                     :
                     DataType, loadMore = false
  ):
    void {
    if (this.allLoaded[dataType]
    ) {
      return;
    }

    this.loadingState[dataType] = true;

    if (!loadMore) {
      this.offset[dataType] = 0;
      this.resetExistingInternalData(dataType);
      this.allLoaded[dataType] = false;
    }
    const getFn: any = this.serviceGetFnMap[dataType];

    if (getFn) {
      getFn(
        this.offset[dataType] + 1,
        this.limit[dataType] + 10,
        undefined,
        this.searchValue[dataType]?.trim() ? this.searchValue[dataType] : undefined
      ).subscribe({
        next: (response: any) => {
          if (response.content.length < this.limit[dataType]) {
            this.allLoaded[dataType] = true;
          }
          this.upgradeExistingInternalData(dataType, response.content);
          this.offset[dataType] += 1;
          this.loadingState[dataType] = false;
        },
        error: () => {
          console.log("zzz");
          this.loadingState[dataType] = false;
        },
      });
    } else {
      console.error(`Service for ${dataType} not found`);
      this.loadingState[dataType] = false;
    }
  }


  onScrollToBottom(type: DataType):
    void {
    if (!this.loadingState[type]) {
      this.loadingState[type] = true;
      this.loadInternalData(type, true)
    }
  }


  onSearch(value: string, type: DataType): void {
    this.searchValue[type] = value.trim();
    this.allLoaded[type] = false;
    this.loadInternalData(type)
  }


  setDataInForm(data: Dragon | undefined, coord: Coordinates | null,
                cave: DragonCave | null, killer: Person | null,
                heads: DragonHead[] | null
  ) {
    this.validateForm.patchValue({
      name: data?.name,
      coordinates: coord,
      creationDate: data?.creationDate,
      cave: cave,
      killer: killer,
      age: data?.age,
      wingspan: data?.wingspan,
      color: data?.color,
      character: data?.character,
      heads:heads,
      canEdit: data?.canEdit
    });
  }


  protected readonly DataType = DataType;
}
