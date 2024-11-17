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

@Component({
  selector: 'app-location-form',
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
    NgIf,
    NzIconDirective,
    NzSwitchComponent
  ],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent {
  private locationService = inject(LocationService);
  showAddButton = true;
  idForEdit: number | undefined;


  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      xValue: ['', [
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      yValue: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      zValue: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      name: ['', [Validators.required]],
      canEdit:[false]
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
    if (this.validateForm.valid && this.idForEdit) {
      const location: Location = {
        id: this.idForEdit,
        x: this.validateForm.value.xValue,
        y: this.validateForm.value.yValue,
        z: this.validateForm.value.zValue,
        name: this.validateForm.value.name,
        canEdit: this.validateForm.value.canEdit
      };
      this.locationService.updateLocation(
        location
      ).subscribe((data: Location) => {
        console.log(data);
      })
    }
  }

  hideAddButtonFn() {
    this.showAddButton = false;
  }


  setDefaultData(data: Location) {
    this.idForEdit = data.id;
    this.validateForm.patchValue({
      yValue: data.y,
      xValue: data.x,
      zValue: data.z,
      name: data.name,
      canEdit: data.canEdit
    });
  }
}
