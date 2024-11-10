import { Component } from '@angular/core';
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

@Component({
  selector: 'app-dragonhead-form',
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
    NgIf
  ],
  templateUrl: './dragon-head-form.component.html',
  styleUrl: './dragon-head-form.component.css'
})
export class DragonHeadFormComponent {
  showAddButton = true;
  validateForm: FormGroup<{
    eyes: FormControl<string> ;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      eyes: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]]
    });
  }

  addHead(){}
  hideAddButtonFn(){
    this.showAddButton = false;
  }
}
