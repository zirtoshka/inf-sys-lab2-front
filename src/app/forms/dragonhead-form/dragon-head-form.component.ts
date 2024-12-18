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
import {HeadService} from '../../services/head.service';
import {DragonHead} from '../../dragondto/dragonhead';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dragonhead-form',
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
  standalone: true,
  styleUrl: './dragon-head-form.component.css'
})
export class DragonHeadFormComponent {
  private notificationService = inject(NzNotificationService);

  private headService = inject(HeadService);
  showAddButton = true;
  validateForm: FormGroup;
  defaultData: DragonHead | undefined;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      eyesCount: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      canEdit: ['', [Validators.required,]]
    });
  }

  addHead() {
    if (this.validateForm.valid) {
      this.headService.addHead(this.validateForm.value)
        .subscribe({
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

  updateHead() {
    if (this.validateForm.valid && this.defaultData) {
      const head: DragonHead = {
        id: this.defaultData.id,
        eyesCount: this.validateForm.value.eyesCount,
        canEdit: this.validateForm.value.canEdit
      };
      this.headService.updateHead(
        head
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

  setCanEdit() {
    if (this.defaultData) {
      return this.defaultData.canEdit;
    }
    return false;
  }

  setDefaultData(data: DragonHead) {
    this.defaultData = data;
  }
}
