import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Color} from '../../dragondto/color';
import {Location} from '../../dragondto/location';
import {Country} from '../../dragondto/country';
import {Coordinates} from '../../dragondto/coordinates';
import {DragonCave} from '../../dragondto/dragoncave';
import {Person} from '../../dragondto/person';
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
import {Head} from 'rxjs';


@Component({
  selector: 'app-dragon-form',
  standalone: true,
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
    DragonHeadFormComponent
  ],
  providers: [NzModalService],
  templateUrl: './dragon-form.component.html',
  styleUrl: './dragon-form.component.css'
})
export class DragonFormComponent {
  @ViewChild(PersonFormComponent) personFormComponent!: PersonFormComponent;
  @ViewChild(CoordinatesFormComponent) coordinatesFormComponent!: CoordinatesFormComponent;
  @ViewChild(DragonCaveFormComponent) caveFormComponent!: DragonCaveFormComponent;
  @ViewChild(DragonHeadFormComponent) headFormComponent!: DragonHeadFormComponent;

  isKillerModalVisible = false;
  isCoordinatesModalVisible = false;
  isCaveModalVisible = false;
  isHeadModalVisible = false;

  validateForm: FormGroup;
  // <{
  //   name: FormControl<string>;
  //   coordinates: FormControl<Coordinates>;
  //   cave: FormControl<DragonCave>;
  //   killer: FormControl<Person>;
  //   age: FormControl<string>;
  //   wingspan: FormControl<string>;
  //   color: FormControl<Color>;
  //   character: FormControl<DragonCharacter>;
  //   head:FormControl<DragonHead[]>;
  // }>;

  existingCoordinates: Coordinates[] = [
    {id: 1, x: 1, y: 1},
    {id: 2, x: 2, y: 2}
  ];

  existingCave: DragonCave[] = [
    {id: 1, numberOfTreasures: 1},
    {id: 2, numberOfTreasures: 2},
  ]
  existingDragonHeads: DragonHead[] = [
    {id: 1, eyesCount: 1},
    {id: 2, eyesCount: 2},
  ]
  existingLocations: Location[] = [
    {id: 1, x: 1, y: 1, z: 1, name: 'New York'},
    {id: 2, x: 1, y: 1, z: 1, name: 'Los Angeles'},
    {id: 3, x: 1, y: 1, z: 1, name: 'Chicago'}
  ];
  existingPerson: Person[] = [
    {
      id: 1, name: "Zhora", eyeColor: Color.BLUE, hairColor: Color.WHITE,
      location: this.existingLocations[0], height: 3,
      passportID: "123456lolik", nationality: Country.USA
    },
    {
      id: 2, name: "Tolik", eyeColor: Color.BLUE, hairColor: Color.WHITE,
      location: this.existingLocations[1], height: 3,
      passportID: "123456lolik", nationality: Country.USA
    }
  ];


  colors = Object.values(Color);

  characters = Object.values(DragonCharacter);

  selectedKiller: any = null;
  selectedCoordinates: any = null;
  selectedCave: any = null;
  selectedHeads: any = null;


  constructor(private fb: NonNullableFormBuilder, private cd: ChangeDetectorRef) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      coordinates: [null, [Validators.required]],
      cave: [null, [Validators.required]],
      killer: [null, [Validators.required]],
      age: ['', [Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      wingspan: ['', [Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      color: [null, [Validators.required]],
      character: [null, [Validators.required]],
      heads: [[], [Validators.required]],
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
    //todo
  }

  handleOkPerson() {
    // this.personFormComponent.showAddButtonFn();
  }

  handleOkCoordinates() {
    // this.coordinatesFormComponent.hideAddButtonFn();
  }

  handleOkCave() {
    // this.caveFormComponent.hideAddButtonFn();
  }

  handleOkHead() {
    // this.headFormComponent.showAddButtonFn();
  }
}
