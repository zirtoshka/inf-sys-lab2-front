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
export class DragonCaveFormComponent {
  private caveService = inject(CaveService);
  showAddButton = true;
  validateForm: FormGroup;
  defaultData: DragonCave | undefined;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      numberOfTreasures: ['', [Validators.required,
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      canEdit: ["", Validators.required],
    });
  }

  addCave() {
    if (this.validateForm.valid) {
      this.caveService.addCave(
        this.validateForm.value
      ).subscribe((cave: DragonCave) => {
        console.log(cave)
      })
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
        .subscribe((cave: DragonCave) => {
          console.log(cave)
        });
    }
  }


  setDefaultData(data: DragonCave) {
    this.defaultData = data;
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
}
