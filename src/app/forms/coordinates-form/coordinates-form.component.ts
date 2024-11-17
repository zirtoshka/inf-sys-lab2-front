import {Component, inject, OnInit} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {RouterLink} from "@angular/router";
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NgIf} from '@angular/common';
import {CoordinatesService} from '../../services/coordinates.service';
import {Coordinates} from '../../dragondto/coordinates';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzModalComponent} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-coordinates-form',
  standalone: true,
  imports: [
    FormsModule,
    NzButtonComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    ReactiveFormsModule,
    RouterLink,
    NzFormLabelComponent,
    NzColDirective,
    NgIf,
    NzSwitchComponent,
    NzModalComponent
  ],
  templateUrl: './coordinates-form.component.html',
  styleUrl: './coordinates-form.component.css'
})
export class CoordinatesFormComponent {
  private coordinatesService = inject(CoordinatesService);
  showAddButton = true;
  validateForm: FormGroup;
  idForEdit: number | undefined;


  constructor(private fb: NonNullableFormBuilder) {

    this.validateForm = this.fb.group({
      xValue: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      yValue: ['', [Validators.required,
        Validators.min(-182),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      canEdit: ['', [Validators.required,]]
    });
  }

  addCoordinates() {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;
      this.coordinatesService.addCoordinates(
        formData
      ).subscribe((coord: Coordinates) => {
        console.log(coord);
      });
    }
  }

  updateCoordinates() {
    if (this.validateForm.valid && this.idForEdit) {
      const coordinates: Coordinates = {
        id: this.idForEdit,
        x: this.validateForm.value.xValue,
        y: this.validateForm.value.yValue,
        canEdit: this.validateForm.value.canEdit
      };
      this.coordinatesService.updateCoordinates(
        coordinates
      ).subscribe((coord: Coordinates) => {
        console.log(coord);
      })
    }
  }

  getFormData() {
    return this.validateForm.value;
  }

  hideAddButtonFn() {
    this.showAddButton = false;
  }


  setDefaultData(data: Coordinates) {
    this.idForEdit = data.id;
    this.validateForm.patchValue({
      yValue: data.y,
      xValue: data.x,
      canEdit: data.canEdit
    });
  }

}
