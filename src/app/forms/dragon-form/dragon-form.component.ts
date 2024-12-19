import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
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
export class DragonFormComponent extends FormEditable<Dragon> {
  @ViewChild(PersonFormComponent) personFormComponent!: PersonFormComponent;
  @ViewChild(CoordinatesFormComponent) coordinatesFormComponent!: CoordinatesFormComponent;
  @ViewChild(DragonCaveFormComponent) caveFormComponent!: DragonCaveFormComponent;
  @ViewChild(DragonHeadFormComponent) headFormComponent!: DragonHeadFormComponent;

  private dragonService = inject(DragonService);

  showAddButton = true;
  defaultData: Dragon | undefined;

  isKillerModalVisible = false;
  isCoordinatesModalVisible = false;
  isCaveModalVisible = false;
  isHeadModalVisible = false;

  validateForm: FormGroup;


  existingCoordinates: Coordinates[] = [];

  existingCave: DragonCave[] = [];

  existingDragonHeads: DragonHead[] = []
  existingLocations: Location[] = [
    {id: 1, x: 1, y: 1, z: 1, name: 'New York', canEdit: true},
    {id: 2, x: 1, y: 1, z: 1, name: 'Los Angeles', canEdit: true},
    {id: 3, x: 1, y: 1, z: 1, name: 'Chicago', canEdit: true}
  ];

  loadingState = {
    coord: false,
    cave: false
  };

  colors = Object.values(Color);

  characters = Object.values(DragonCharacter);


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

  updateDragon() {
    if (this.validateForm.valid && this.defaultData) {
      const head: Dragon = {
        age: this.defaultData.age,
        cave: this.defaultData.cave,
        character: this.defaultData.character,
        color: this.defaultData.color,
        coordinates: this.defaultData.coordinates,
        creationDate: this.defaultData.creationDate,
        heads: this.defaultData.heads,
        killer: this.defaultData.killer,
        wingspan: this.defaultData.wingspan,
        id: this.defaultData.id,
        name: this.validateForm.value.eyes,
        canEdit: this.validateForm.value.canEdit
      };
      this.dragonService.updateDragon(
        head
      ).subscribe((data: Dragon) => {
        console.log(data);
      })
    }
  }


  handleOkPerson() {
    // this.personFormComponent.showAddButtonFn();
  }

  handleOkCoordinates() {
    this.coordinatesFormComponent.addCoordinates();
    this.handleCancelCoord();
  }

  handleOkCave() {
    this.caveFormComponent.addCave();
    this.handleCancelCave();
  }

  handleCancelCave(): void {
    this.isCaveModalVisible = false;
  }

  handleOkHead() {
    // this.headFormComponent.showAddButtonFn();
  }


  setDefaultData(data: Dragon) {
    this.defaultData = data;
  }

  hideAddButtonFn() {
    this.personFormComponent.hideAddButtonFn();
    this.coordinatesFormComponent.hideAddButtonFn();
    this.caveFormComponent.hideAddButtonFn();
    this.headFormComponent.hideAddButtonFn();
  }


  searchValue = "";
  allLoaded = false;

  offset = 0;
  limit = 2;
  private coordService = inject(CoordinatesService);
  private caveService = inject(CaveService);


  loadCoord(loadMore = false): void {
    if (this.allLoaded) {
      return;
    }
    this.loadingState['coord'] = true;
    if (!loadMore) {
      this.offset = 0;
      this.existingCoordinates = [];
      this.allLoaded = false;
    }

    this.coordService.getCoordinates(
      this.offset + 1,
      this.limit + 10, undefined, this.searchValue?.trim() ? this.searchValue : undefined
    ).subscribe({
      next: (response) => {
        if (response.content.length < this.limit) {
          this.allLoaded = true;
        }
        this.existingCoordinates = [...this.existingCoordinates, ...response.content];
        this.offset += this.limit;
        this.loadingState['coord'] = false;
      },
      error: () => {
        this.loadingState['coord'] = false;
      },
    });
  }

  handleCancelCoord(): void {
    this.isCoordinatesModalVisible = false;
  }



  loadCave(loadMore = false): void {
    if (this.allLoaded) {
      return;
    }
    this.loadingState['cave'] = true;
    if (!loadMore) {
      this.offset = 0;
      this.existingCave = [];
      this.allLoaded = false;
    }

    this.caveService.getCaves(
      this.offset + 1,
      this.limit + 10, undefined, this.searchValue?.trim() ? this.searchValue : undefined
    ).subscribe({
      next: (response) => {
        if (response.content.length < this.limit) {
          this.allLoaded = true;
        }
        this.existingCave = [...this.existingCave, ...response.content];
        this.offset += this.limit;
        this.loadingState['cave'] = false;
      },
      error: () => {
        this.loadingState['cave'] = false;
      },
    });
  }


  onScrollToBottom(type: 'coord' | 'cave'): void {
    if (!this.loadingState[type]) {
      this.loadingState[type] = true;

      if (type === 'coord') {
        this.loadCoord(true);
      } else if (type === 'cave') {
        this.loadCave(true);
      }
    }
  }


  onSearch(value: string, type: 'coord' | 'cave'): void {
    this.searchValue = value.trim();
    this.allLoaded = false;
    if (type === 'coord') {
      this.loadCoord(true);
    } else if (type === 'cave') {
      this.loadCave(true);
    }
  }

}
