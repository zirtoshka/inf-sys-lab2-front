import {ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
import {Coordinates} from '../../dragondto/coordinates';
import {LocationService} from '../../services/location.service';

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
export class PersonFormComponent implements OnInit {
  @ViewChild(LocationFormComponent) locationFormComponent!: LocationFormComponent;
  private personService = inject(PersonService);
  showAddButton = true;

  defaultData: Person | undefined;

  validateForm: FormGroup;
  isLocationModalVisible = false;
  colors = Object.values(Color);
  countries = Object.values(Country);

  constructor(private fb: NonNullableFormBuilder, private cd: ChangeDetectorRef) {
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
      canEdit: [null, [Validators.required]],
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
    this.isLocationModalVisible = false;
  }


  addPerson(): void {
    if (this.validateForm.valid) {
      const personData = this.validateForm.value;
      this.personService.addPerson(personData)
        .subscribe((person: Person) => {
          console.log(person);
        })
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
      ).subscribe((data: Person) => {
        console.log(data);
      })
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

  setDefaultData(data: Person) {
    this.defaultData = data;
  }

  loc: Location = {
    id: 1,
    x: 2, y: 3, z: 4, name: "fffofodsdlkfdsfdkkf", canEdit: true

  }

  setLocation() {
    if (this.defaultData) {
      return <Location>this.defaultData.location;
    }
    return this.loc;
  }

  handleOkLoc() {
    this.locationFormComponent.addLocation();
    this.isLocationModalVisible = false;
  }


  selectedLocation: Location | null = null;
  locations: Location[] = [];
  loading = false;
  searchValue = "";
  offset = 0;
  limit = 2;
  totalElements = 0;
  allLoaded = false;

  ngOnInit()
    :
    void {
    this.loadLocations();
  }


  private locationService = inject(LocationService);

  loadLocations(loadMore = false)
    :
    void {
    if (this.allLoaded
    ) {
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

  onSearch(value
             :
             string
  ):
    void {
    this.searchValue = value.trim();
    this.allLoaded = false;
    this.loadLocations();
  }

  onScrollToBottom()
    :
    void {
    if (!
      this.loading
    ) {
      this.loadLocations(true);
    }
  }


}
