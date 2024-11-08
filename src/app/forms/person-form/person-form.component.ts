import {Component} from '@angular/core';
import {
  FormBuilder,
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
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';

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
    NzSwitchComponent
  ],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {

  colors = Object.values(Color);
  countries = Object.values(Country);



  locations = [
    {name: 'New York'},
    {name: 'Los Angeles'},
    {name: 'Chicago'}
  ];
  selectedLocation: any = null;
  isCreatingNewLocation: boolean = false;

  validateForm: FormGroup<{
    name: FormControl<string>;
    eyeColor: FormControl<Color>;
    hairColor: FormControl<Color>;
    location: FormControl<string>;
    height: FormControl<string>;
    passportId: FormControl<string>;
    nationality: FormControl<Country>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required,]],
      eyeColor: [this.colors[0], [Validators.required]],
      hairColor: [this.colors[0], [Validators.required]],
      location: ['', [Validators.required]],
      height: ['', [Validators.required,
        Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      passportId: ['', [Validators.required]],
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
