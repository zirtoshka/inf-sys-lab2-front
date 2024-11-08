import {Component} from '@angular/core';
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
    FormsModule
  ],
  templateUrl: './dragon-form.component.html',
  styleUrl: './dragon-form.component.css'
})
export class DragonFormComponent {
  validateForm: FormGroup<{
    name: FormControl<string>;

    coordinates: FormControl<Coordinates>;
    xCoordinate: FormControl<string>;
    yCoordinate: FormControl<string>;

    cave: FormControl<DragonCave>;
    numberOfTreasures: FormControl<string>;

    // person
    killer: FormControl<Person>;
    personName: FormControl<string>;
    eyeColor: FormControl<Color>;
    hairColor: FormControl<Color>;
    //person location beginning
    location: FormControl<Location>;
    xValue: FormControl<string>;
    yValue: FormControl<string>;
    zValue: FormControl<string>;
    locationName: FormControl<string>;
    //person location end
    height: FormControl<string>;
    passportID: FormControl<string>;
    nationality: FormControl<Country>;
    // person end

    age: FormControl<string>;
    wingspan: FormControl<string>;
    color: FormControl<Color>;
    character: FormControl<DragonCharacter>;

    head: FormControl<DragonHead>;
    eyesCount: FormControl<string>;

  }>;

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
  countries = Object.values(Country);

  characters = Object.values(DragonCharacter);


  isCreatingNewLocation: boolean = false;
  selectedLocation: any = null;

  isCreatingNewKiller: boolean = false;
  selectedKiller: any = null;


  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({

      name: ['', [Validators.required]],
      //coord
      coordinates: [this.existingCoordinates[0], [Validators.required]],
      xCoordinate: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      yCoordinate: ['', [Validators.required,
        Validators.min(-182),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],

      //cave
      cave: [this.existingCave[0], [Validators.required]],
      numberOfTreasures: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],

      // person
      killer: [this.existingPerson[0], [Validators.required]],
      personName: ['', [Validators.required]],
      eyeColor: [this.colors[0], [Validators.required]],
      hairColor: [this.colors[0], [Validators.required]],
      //person location beginning
      location: [this.existingLocations[0]],
      xValue: ['', [Validators.required, Validators.pattern('-?\\d+(\\.\\d+)?')]],
      yValue: ['', [Validators.required, Validators.pattern('-?\\d+(\\.\\d+)?')]],
      zValue: ['', [Validators.required, Validators.pattern('-?\\d+(\\.\\d+)?')]],
      locationName: ['', [Validators.required]],
      //person location end
      height: ['', [Validators.required,
        Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      passportID: ['', [Validators.required]],
      nationality: [this.countries[0], [Validators.required]],
      // person end

      age: ['', [Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      wingspan: ['', [Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      color: [this.colors[0], [Validators.required]],
      character: [this.characters[0], [Validators.required]],

      // head
      head: [this.existingDragonHeads[0]],
      eyesCount: ['', [Validators.pattern('-?\\d+(\\.\\d+)?')]]

    })
  }


  onSwitchChangeLocation(value: boolean) {
    this.isCreatingNewLocation = value;
    console.log(this.isCreatingNewLocation);
  }

  onSwitchChangeKiller(value: boolean) {
    this.isCreatingNewKiller = value;
  }

  addDragon(){}
}
