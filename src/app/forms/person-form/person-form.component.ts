import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild
} from '@angular/core';
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
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {Color} from '../../dragondto/color';
import {NgForOf, NgIf} from '@angular/common';
import {Country} from '../../dragondto/country';
import {Location} from '../../dragondto/location';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {LocationFormComponent} from '../location-form/location-form.component';
import {PersonService} from '../../services/person.service';
import {Person} from '../../dragondto/person';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {LocationService} from '../../services/location.service';
import {FormEditable} from '../form';

@Component({
  selector: 'app-person-form',
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
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NgIf,
    NzRadioGroupComponent,
    NzRadioComponent,
    NzSwitchComponent,
    NzDividerComponent,
    NzModalComponent,
    LocationFormComponent,
    NzIconDirective
  ],
  providers: [NzModalService],
  templateUrl: './person-form.component.html',
  standalone: true,
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent extends FormEditable<Person> implements AfterViewChecked {
  @ViewChild(LocationFormComponent) locationFormComponent!: LocationFormComponent;
  private personService = inject(PersonService);
  showAddButton = true;

  defaultData: Person | undefined;

  validateForm: FormGroup;
  isLocationModalVisible = false;
  colors = Object.values(Color);
  countries = Object.values(Country);

  constructor(private fb: NonNullableFormBuilder, private cd: ChangeDetectorRef) {
    super();
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      eyeColor: [null, [Validators.required]],
      hairColor: [null, [Validators.required]],
      location: [null],
      nationality: [null, [Validators.required]],
      height: ['', [Validators.required,
        Validators.min(0),
        Validators.pattern('-?\\d+(\\.\\d+)?')]],
      passportID: [null],
      canEdit: [false, [Validators.required]],
    });
  }

  ngAfterViewChecked(): void {
    if (this.locationFormComponent) {
      this.locationFormComponent.hideAddButtonFn();
      this.cd.detectChanges();
    }
  }

  openLocationModal(): void {
    this.isLocationModalVisible = true;
  }


  handleCancelLoc(): void {
    this.allLoaded = false
    this.isLocationModalVisible = false;
  }


  addPerson(): void {
    if (this.validateForm.valid) {
      const personData = this.validateForm.value;
      this.personService.addPerson(personData)
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

  updatePerson() {
    if (this.validateForm.valid && this.defaultData) {
      const locId = this.validateForm.value.location?.id ?
        this.validateForm.value.location.id : this.defaultData.locationId;
      const person = {
        id: this.defaultData.id,
        name: this.validateForm.value.name,
        eyeColor: <Color>this.validateForm.value.eyeColor,
        hairColor: <Color>this.validateForm.value.hairColor,
        location: locId ? {id: locId} : locId,
        height: this.validateForm.value.height,
        passportID: this.validateForm.value.passportID,
        nationality: <Country>this.validateForm.value.nationality,
        canEdit: this.validateForm.value.canEdit
      };
      this.personService.updatePerson(
        person
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


  handleOkLoc() {
    this.locationFormComponent.addLocation();
    this.isLocationModalVisible = false;
  }

  isLocationFormValid() {
    if (this.locationFormComponent) {
      return this.locationFormComponent.validateForm.valid;
    }
    return false;
  }

  locations: Location[] = [];
  loading = false;
  searchValue = "";
  offset = 0;
  limit = 2;
  totalElements = 0;
  allLoaded = false;

  private locationService = inject(LocationService);

  loadLocations(loadMore = false): void {
    if (this.allLoaded) {
      return;
    }
    this.loading = true;
    if (!loadMore) {
      this.offset = 0;
      this.locations = [];
      this.allLoaded = false;
    }

    this.locationService.getLocations(
      this.offset + 1,
      this.limit + 10, undefined, undefined, undefined, undefined,
      this.searchValue?.trim() ? this.searchValue : undefined
    ).subscribe({
      next: (response) => {
        if (response.content.length < this.limit) {
          this.allLoaded = true;
        }
        this.locations = [...this.locations, ...response.content];
        this.offset += this.limit;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSearch(value: string): void {
    this.searchValue = value.trim();
    this.allLoaded = false;
    this.loadLocations();
  }

  onScrollToBottom(): void {
    if (!this.loading) {
      this.loadLocations(true);
    }
  }

  setDefaultData(data: Person | undefined) {

    this.defaultData = data;
    let locFromData: Location | null = null;
    if (data?.locationId) {
      this.locationService.getLocations(
        undefined,
        undefined, undefined, data?.locationId
      ).subscribe({
        next: (response) => {
          const rowData: Location[] = [...response.content]
          if (rowData) {
            locFromData = {
              id: rowData[0].id,
              name: rowData[0].name,
              x: rowData[0].x,
              y: rowData[0].y,
              z: rowData[0].z,
              canEdit: rowData[0].canEdit
            }
            this.locations = [locFromData]
            this.setDataInForm(data, locFromData);
          }
        }

      });
    } else {
      this.setDataInForm(data, locFromData);
    }

  }

  setDataInForm(data: Person | undefined, location: Location | null) {
    this.validateForm.patchValue({
      name: data?.name,
      canEdit: data?.canEdit,
      eyeColor: data?.eyeColor,
      hairColor: data?.hairColor,
      location: location,
      height: data?.height,
      passportID: data?.passportID,
      nationality: data?.nationality,

    });
  }

}
