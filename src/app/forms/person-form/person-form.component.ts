import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {
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
import {PersonService} from '../../services/person.service';
import {Person} from '../../dragondto/person';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {Coordinates} from '../../dragondto/coordinates';

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
    LocationFormComponent,
    NzIconDirective
  ],
  providers: [NzModalService],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {
  @ViewChild(LocationFormComponent) locationFormComponent!: LocationFormComponent;
  private personService = inject(PersonService);
  showAddButton = true;

  idForEdit: number | undefined;

  validateForm: FormGroup;
  isLocationModalVisible = false;
  colors = Object.values(Color);
  countries = Object.values(Country);
  existingLocations: Location[] = [
    {id: 1, name: 'Location 1', x: 0, y: 0, z: 0, canEdit: true},
    {id: 2, name: 'Location 2', x: 1, y: 1, z: 1, canEdit: true}];
  selectedLocation: any;

  constructor(private fb: NonNullableFormBuilder, private cd: ChangeDetectorRef) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      eyeColor: [null, [Validators.required]],
      hairColor: [null, [Validators.required]],
      location: [null],
      nationality: [null, [Validators.required]],
      height: ['', [Validators.required,
        Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      passportID: [null],
      canEdit: [null, [Validators.required]],
    });
  }

  ngAfterViewChecked(): void {
    if (this.locationFormComponent) {
      this.locationFormComponent.hideAddButtonFn();
      this.cd.detectChanges();
    }
  }

  openLocationModal(): void {
    this.isLocationModalVisible = true;
  }


  handleCancel(): void {
    this.isLocationModalVisible = false;
  }

  handleOk(): void {
    // this.locationFormComponent.showAddButtonFn();
    // const newLocation = get new location todo
    //   this.existingLocations.push(newLocation);
    //   this.selectedLocation = newLocation;
    //   this.isLocationModalVisible = false; !!!!

    // this.locationFormComponent.showAddButtonFn();

  }

  addPerson(): void {
    if (this.validateForm.valid) {
      const personData = this.validateForm.value;
      this.personService.addPerson(personData)
        .subscribe((person: Person) => {
          console.log(person);
        })
    }
  }

  updatePerson() {
    if (this.validateForm.valid && this.idForEdit) {
      const coordinates: Coordinates = { //todo ->person
        id: this.idForEdit,
        x: this.validateForm.value.xValue,
        y: this.validateForm.value.yValue,
        canEdit: this.validateForm.value.canEdit
      };
      this.personService.updatePerson(
        coordinates
      ).subscribe((data: Person) => {
        console.log(data);
      })
    }
  }

  hideAddButtonFn() {
    this.showAddButton = false;
  }


  setDefaultData(data: Person) {
    this.idForEdit = data.id;
    this.validateForm.patchValue({
      name: data.name,  //todo ->person valid data
      eyeColor: data.eyeColor,
      hairColor: data.hairColor,
      location:data.location, //todo ???
      nationality: data.nationality,
      height: data.height,
      passportID: data.passportID,
      canEdit: data.canEdit

    });
  }

}
