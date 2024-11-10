import {Component, ViewChild} from '@angular/core';
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
import {Location} from '../../dragondto/location';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {LocationFormComponent} from '../location-form/location-form.component';

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
    NzDividerComponent,
    NzModalComponent,
    LocationFormComponent
  ],
  providers: [NzModalService],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {
  @ViewChild(LocationFormComponent) locationFormComponent!: LocationFormComponent;
  showAddButton = false;

  validateForm: FormGroup<{
    name: FormControl<string>;
    eyeColor: FormControl<Color>;
    hairColor: FormControl<Color>;
    location: FormControl<Location>;
    height: FormControl<string>;
    passportID: FormControl<string>;
    nationality: FormControl<Country>;
  }>
  isLocationModalVisible = false;
  colors = Object.values(Color);
  countries = Object.values(Country);
  existingLocations: Location[] = [
    {id: 1, name: 'Location 1', x: 0, y: 0, z: 0},
    {id: 2, name: 'Location 2', x: 1, y: 1, z: 1}];
  selectedLocation: any;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      eyeColor: [this.colors[0], [Validators.required]],
      hairColor: [this.colors[0], [Validators.required]],
      location: [this.existingLocations[0]],
      nationality: [this.countries[0], [Validators.required]],
      height: ['', [Validators.required,
        Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      passportID: ['', [Validators.required]],
    });
  }


  openLocationModal(): void {
    this.isLocationModalVisible = true;
  }


  handleCancel(): void {
    this.isLocationModalVisible = false;
  }

  handleOk(): void {
    this.locationFormComponent.showAddButtonFn();
    // const newLocation = get new location todo
    //   this.existingLocations.push(newLocation);
    //   this.selectedLocation = newLocation;
    //   this.isLocationModalVisible = false; !!!!

    this.locationFormComponent.showAddButtonFn();

  }

  addPerson(): void {
    if (this.validateForm.valid) {
      const personData = this.validateForm.value;
      console.log('Person data:', personData);
    }
  }

  showAddButtonFn() {
    this.showAddButton = true;
  }


}
