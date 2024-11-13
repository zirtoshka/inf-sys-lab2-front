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
import {HeadService} from '../../services/head.service';
import {DragonHead} from '../../dragondto/dragonhead';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';

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
    NgIf,
    NzIconDirective,
    NzSwitchComponent
  ],
  templateUrl: './dragon-head-form.component.html',
  styleUrl: './dragon-head-form.component.css'
})
export class DragonHeadFormComponent {
  private headService = inject(HeadService);
  showAddButton = true;
  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      eyes: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      canEdit: ['', [Validators.required,]]
    });
  }

  addHead() {
    if (this.validateForm.valid) {
      this.headService.addHead(this.validateForm.value)
        .subscribe((head: DragonHead) => {
          console.log(head);
        })
    }
  }

  hideAddButtonFn() {
    this.showAddButton = false;
  }
}
