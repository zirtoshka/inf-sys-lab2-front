import {Component} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {Color} from '../../dragondto/color';
import {NgForOf, NgIf} from '@angular/common';
import {Country} from '../../dragondto/country';
import {Location} from '../../dragondto/location';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzDividerComponent} from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NgIf,
    NzRadioGroupComponent,
    NzRadioComponent,
    NzSwitchComponent,
    NzDividerComponent
  ],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {

  colors = Object.values(Color);
  countries = Object.values(Country);


  locations: Location[] = [
    {id: 1, x: 1, y: 1, z: 1, name: 'New York'},
    {id: 2, x: 1, y: 1, z: 1, name: 'Los Angeles'},
    {id: 3, x: 1, y: 1, z: 1, name: 'Chicago'}
  ];
  selectedLocation: any = null;
  isCreatingNewLocation: boolean = false;

  validateForm: FormGroup<{
    name: FormControl<string>;
    eyeColor: FormControl<Color>;
    hairColor: FormControl<Color>;

    location: FormControl<Location>;
    xValue: FormControl<string>;
    yValue: FormControl<string>;
    zValue: FormControl<string>;
    locationName: FormControl<string>;

    height: FormControl<string>;
    passportID: FormControl<string>;
    nationality: FormControl<Country>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required,]],
      eyeColor: [this.colors[0], [Validators.required]],
      hairColor: [this.colors[0], [Validators.required]],
      location: [this.locations[0], [Validators.required]],

      xValue: ['', [Validators.required,Validators.pattern('-?\\d+(\\.\\d+)?')]],
      yValue: ['', [Validators.required,Validators.pattern('-?\\d+(\\.\\d+)?')]],
      zValue: ['', [Validators.required,Validators.pattern('-?\\d+(\\.\\d+)?')]],
      locationName: ['', [Validators.required]],

      height: ['', [Validators.required,
        Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      passportID: ['', [Validators.required]],
      nationality: [this.countries[0], [Validators.required]],
    });
  }


  addPerson() {
  }

  onSwitchChange(value: boolean) {
    this.isCreatingNewLocation = value;
    console.log(this.isCreatingNewLocation);
  }


}
