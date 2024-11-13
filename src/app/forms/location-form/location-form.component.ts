import {Component, inject} from '@angular/core';
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

  validateForm: FormGroup<{
    xValue: FormControl<string>;
    yValue: FormControl<string>;
    zValue: FormControl<string>;
    name: FormControl<string>;
    canEdit: FormControl<boolean>;
  }>;

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

  hideAddButtonFn() {
    this.showAddButton = false;
  }
}
