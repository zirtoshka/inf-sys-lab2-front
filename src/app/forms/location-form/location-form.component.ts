import {Component, inject} from '@angular/core';
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
import {NgIf} from '@angular/common';
import {LocationService} from '../../services/location.service';
import {Location} from '../../dragondto/location';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {Coordinates} from '../../dragondto/coordinates';

@Component({
  selector: 'app-location-form',
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
    NgIf,
    NzIconDirective,
    NzSwitchComponent
  ],
  templateUrl: './location-form.component.html',
  standalone: true,
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent {
  private locationService = inject(LocationService);
  showAddButton = true;
  defaultData: Location | undefined;


  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      x: ['', [
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      y: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      z: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      name: ['', [Validators.required]],
      canEdit: [false]
    });
  }


  addLocation() {
    if (this.validateForm.valid) {
      this.locationService.addLocation(this.validateForm.value)
        .subscribe((loc: Location) => {
          console.log(loc);
        })
    }
  }

  updateLocation() {
    if (this.validateForm.valid && this.defaultData) {
      const location: Location = {
        id: this.defaultData.id,
        x: this.validateForm.value.x,
        y: this.validateForm.value.y,
        z: this.validateForm.value.z,
        name: this.validateForm.value.name,
        canEdit: this.validateForm.value.canEdit
      };
      this.locationService.updateLocation(
        location
      ).subscribe((data: Location) => {
        console.log(data);
      })
    }else{
      console.log("sfsdfsfsdfs") //todo
    }
  }

  hideAddButtonFn() {
    this.showAddButton = false;
  }


  setDefaultData(data: Location) {
    this.defaultData = data;
  }

  setCanEdit() {
    if (this.defaultData) {
      return this.defaultData.canEdit;
    }
    return false;
  }
}
