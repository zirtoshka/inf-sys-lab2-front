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
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {FormEditable} from '../form';
import {Location} from '../../dragondto/location';

@Component({
  selector: 'app-coordinates-form',
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
  standalone: true,
  styleUrl: './coordinates-form.component.css'
})
export class CoordinatesFormComponent extends FormEditable<Coordinates>{

  private coordinatesService = inject(CoordinatesService);
  showAddButton = true;
  validateForm: FormGroup;
  defaultData: Coordinates | undefined;


  constructor(private fb: NonNullableFormBuilder) {
    super();
    this.validateForm = this.fb.group({
      x: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      y: ['', [Validators.required,
        Validators.min(-182),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      canEdit: [false, [Validators.required,]]
    });
  }

  addCoordinates() {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;
      this.coordinatesService.addCoordinates(
        formData
      ).subscribe({
        next: (response) => {
          this.notificationService.success(
            'Success',
            "adding is ok"
          );
        },
        error: (error) => {
          this.notificationService.error(
            'Oops',
            "adding failed"
          );
        }
      });
    }
  }


  updateCoordinates() {
    if (this.validateForm.valid && this.defaultData) {
      const coordinates: Coordinates = {
        id: this.defaultData.id,
        x: this.validateForm.value.x,
        y: this.validateForm.value.y,
        canEdit: this.validateForm.value.canEdit
      };
      this.coordinatesService.updateCoordinates(
        coordinates
      ).subscribe({
        next: (response) => {
          this.notificationService.success(
            'Success',
            "updating is ok"
          );
        },
        error: (error) => {
          this.notificationService.error(
            'Oops',
            "updating failed"
          );
        }
      });
    }
  }

  hideAddButtonFn() {
    this.showAddButton = false;
  }


  setDefaultData(data: Coordinates|undefined) {
    this.defaultData = data;
    this.validateForm.patchValue({
      x:data?.x,
      y:data?.y,
      canEdit:data?.canEdit
    })
  }

}
