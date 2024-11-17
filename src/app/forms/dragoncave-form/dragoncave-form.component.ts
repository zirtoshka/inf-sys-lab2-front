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
  templateUrl: './dragoncave-form.component.html',
  styleUrl: './dragoncave-form.component.css'
})
export class DragonCaveFormComponent {
  private caveService = inject(CaveService);
  showAddButton = true;
  validateForm: FormGroup;
  idForEdit: number | undefined;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      treasures: ['', [Validators.required,
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
    if (this.validateForm.valid && this.idForEdit) {
      const cave: DragonCave = {
        id: this.idForEdit,
        numberOfTreasures: this.validateForm.value.treasures,
        canEdit: this.validateForm.value.canEdit
      };
      this.caveService.updateCave(cave)
        .subscribe((cave: DragonCave) => {
          console.log(cave)
        });
    }
  }



  setDefaultData(data: DragonCave) {
    this.idForEdit = data.id;
    this.validateForm.patchValue({
      treasures: data.numberOfTreasures,
      canEdit: data.canEdit
    });

  }

  hideAddButtonFn() {
    this.showAddButton = false;
  }
}
