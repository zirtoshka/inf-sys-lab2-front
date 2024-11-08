import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-dragoncave-form',
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
    ReactiveFormsModule
  ],
  templateUrl: './dragoncave-form.component.html',
  styleUrl: './dragoncave-form.component.css'
})
export class DragonCaveFormComponent {
  validateForm: FormGroup<{
    treasures: FormControl<string> ;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      treasures: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]]
    });
  }

  addCave(){}
}
