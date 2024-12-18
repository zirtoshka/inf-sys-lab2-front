import {Component, inject} from '@angular/core';
import {
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
import {NgIf} from '@angular/common';
import {CaveService} from '../../services/cave.service';
import {DragonCave} from '../../dragondto/dragoncave';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {FormEditable} from '../form';
import {Coordinates} from '../../dragondto/coordinates';

@Component({
  selector: 'app-dragoncave-form',
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
  templateUrl: './dragoncave-form.component.html',
  standalone: true,
  styleUrl: './dragoncave-form.component.css'
})
export class DragonCaveFormComponent extends FormEditable<DragonCave>{
  private caveService = inject(CaveService);
  showAddButton = true;
  validateForm: FormGroup;
  defaultData: DragonCave | undefined;

  constructor(private fb: NonNullableFormBuilder) {
    super();
    this.validateForm = this.fb.group({
      numberOfTreasures: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      canEdit: [false, Validators.required],
    });
  }

  addCave() {
    if (this.validateForm.valid) {
      this.caveService.addCave(
        this.validateForm.value
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

  updateCave() {
    if (this.validateForm.valid && this.defaultData) {
      const cave: DragonCave = {
        id: this.defaultData.id,
        numberOfTreasures: this.validateForm.value.numberOfTreasures,
        canEdit: this.validateForm.value.canEdit
      };
      this.caveService.updateCave(cave)
        .subscribe({
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


  setDefaultData(data: DragonCave|undefined) {
    this.defaultData = data;
    this.validateForm.patchValue({
      canEdit: data?.canEdit,
      numberOfTreasures: data?.numberOfTreasures,
    })
  }

  hideAddButtonFn() {
    this.showAddButton = false;
  }


}
