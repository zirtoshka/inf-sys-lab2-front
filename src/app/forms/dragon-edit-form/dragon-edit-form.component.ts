import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {CoordinatesFormComponent} from '../coordinates-form/coordinates-form.component';
import {DragonCaveFormComponent} from '../dragoncave-form/dragoncave-form.component';
import {DragonHeadFormComponent} from '../dragonhead-form/dragon-head-form.component';
import {NgForOf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzModalComponent} from 'ng-zorro-antd/modal';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {PersonFormComponent} from '../person-form/person-form.component';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {DragonService} from '../../services/dragon.service';
import {Dragon} from '../../dragondto/dragon';
import {Coordinates} from '../../dragondto/coordinates';
import {DragonCave} from '../../dragondto/dragoncave';
import {DragonHead} from '../../dragondto/dragonhead';
import {Location} from '../../dragondto/location';
import {Person} from '../../dragondto/person';
import {Color} from '../../dragondto/color';
import {Country} from '../../dragondto/country';
import {DragonCharacter} from '../../dragondto/dragoncharacter';

@Component({
  selector: 'app-dragon-edit-form',
  imports: [
    CoordinatesFormComponent,
    DragonCaveFormComponent,
    DragonHeadFormComponent,
    NgForOf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzModalComponent,
    NzOptionComponent,
    NzSelectComponent,
    NzSwitchComponent,
    PersonFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './dragon-edit-form.component.html',
  standalone: true,
  styleUrl: './dragon-edit-form.component.css'
})
export class DragonEditFormComponent {
  private dragonService = inject(DragonService);

  showAddButton = true;
  defaultData: Dragon | undefined;
  listSelectedHeads: DragonHead[] = [];
  selectedHeads: DragonHead[]|undefined;



  validateForm: FormGroup;


  existingCoordinates: Coordinates[] = [
    {id: 1, x: 1, y: 1, canEdit: true},
    {id: 2, x: 2, y: 2, canEdit: true}
  ];

  existingCave: DragonCave[] = [
    {id: 1, numberOfTreasures: 1, canEdit: true},
    {id: 2, numberOfTreasures: 2, canEdit: true},
  ]
  existingDragonHeads: DragonHead[] = [
    {id: 1, eyesCount: 1, canEdit: true},
    {id: 2, eyesCount: 2, canEdit: true},
  ]
  existingLocations: Location[] = [
    {id: 1, x: 1, y: 1, z: 1, name: 'New York', canEdit: true},
    {id: 2, x: 1, y: 1, z: 1, name: 'Los Angeles', canEdit: true},
    {id: 3, x: 1, y: 1, z: 1, name: 'Chicago', canEdit: true}
  ];
  existingPerson: Person[] = [
    {
      id: 1, name: "Zhora", eyeColor: Color.BLUE, hairColor: Color.WHITE,
      location: this.existingLocations[0], height: 3,
      passportID: "123456lolik", nationality: Country.USA,
      canEdit: true
    },
    {
      id: 2, name: "Tolik", eyeColor: Color.BLUE, hairColor: Color.WHITE,
      location: this.existingLocations[1], height: 3,
      passportID: "123456lolik", nationality: Country.USA,
      canEdit: true
    }
  ];


  colors = Object.values(Color);

  characters = Object.values(DragonCharacter);

  selectedKiller: any = null;
  selectedCoordinates: any = null;
  selectedCave: any = null;


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
      canEdit: [null, [Validators.required]],
    })
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


  hideAddButtonFn() {
    this.showAddButton = false;
  }

  setCanEdit() {
    if (this.defaultData) {
      return this.defaultData.canEdit;
    }
    return false;
  }

  setDefaultData(data: Dragon) {
    this.defaultData = data;
    this.selectedHeads = data.heads;

  }

  setCoordinates() {
    if (this.defaultData) {
      return this.existingCoordinates.find(data => data.id === this.defaultData?.coordinates.id);
    }
    return null
  }

  setCave() {
    if (this.defaultData) {
      return this.existingCave.find(data => data.id === this.defaultData?.cave.id);
    }
    return null
  }

  setKiller() {
    if (this.defaultData) {

      return this.existingPerson.find(data => data.id === this.defaultData?.killer?.id);
    }
    return null
  }

  setHeads(): DragonHead[] {
    if (this.defaultData) {
      return this.defaultData.heads.map((head) =>
        this.existingDragonHeads.find((existingHead) => existingHead.id === head.id)
      ).filter((head): head is DragonHead => !!head);
    }
    return [];
  }

}
