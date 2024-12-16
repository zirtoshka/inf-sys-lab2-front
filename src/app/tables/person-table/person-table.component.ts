import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {Person} from '../../dragondto/person';
import {Color} from '../../dragondto/color';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {CoordinatesFormComponent} from '../../forms/coordinates-form/coordinates-form.component';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {PersonFormComponent} from '../../forms/person-form/person-form.component';
import {PersonService} from '../../services/person.service';
import {Location} from '../../dragondto/location';
import {DtoTable} from '../dto-table';
import {WebSocketService} from '../../websocket.service';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {Country} from '../../dragondto/country';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-person-table',
  imports: [
    NzThAddOnComponent,
    ReactiveFormsModule,
    NzTableComponent,
    FormsModule,
    NgForOf,
    NzButtonComponent,
    NzPopconfirmDirective,
    CoordinatesFormComponent,
    NzModalComponent,
    PersonFormComponent,
    NgIf,
    NzRadioComponent,
    NzIconDirective,
    NgClass,
    NzPaginationComponent
  ],
  providers: [NzModalService, WebSocketService],
  templateUrl: './person-table.component.html',
  standalone: true,
  styleUrl: './person-table.component.css'
})
export class PersonTableComponent extends DtoTable<Person> {
  private personService = inject(PersonService);
  private locationService = inject(LocationService);

  @ViewChild(PersonFormComponent) declare formComponent: PersonFormComponent;


  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
    this.sortOrder = {
      id: undefined,
      name: undefined,
      eye: undefined,
      hair: undefined,
      location: undefined,
      height: undefined,
      passport: undefined,
      nationality: undefined,
    }
    this.filters = {
      id: undefined,
      canEdit: undefined,
      name: undefined,
      hairColor: undefined,
      eyeColor: undefined,
      locationId: undefined,
      height: undefined,
      passportID: undefined,
      nationality: undefined,
    }
  }


  deleteRow(id: number): void {
    this.personService.deletePerson(
      {id: id})
      .subscribe((res) => {
        console.log(res);
      })
  }
  handleOk() {
    this.formComponent.updatePerson();
    this.isEditModalVisible = false;
  }

  loadData(page: number, size: number, sort?: string, filters?: Record<string, any>): void {
    this.personService.getPersons(page, size, sort,
      filters?.['id'], filters?.['canEdit'], filters?.['userId'], filters?.['name'],
      filters?.['eyeColor'],
      filters?.['hairColor'],
      filters?.['locationId'],
      filters?.['height'],
      filters?.['passportID'],
      filters?.['nationality']
    ).subscribe({
      next: (response) => {
        this.listOfData = response.content.map(person => ({
          id: person.id,
          name: person.name,
          eyeColor: <Color> person.eyeColor,
          hairColor:  <Color> person.hairColor,
          locationId: person.locationId,
          location:null,
          height: person.height,
          passportID: person.passportID,
          nationality:  <Country> person.nationality,
          canEdit: person.canEdit
        }));
        this.currPage = response.number + 1;
        this.pageSize = response.size;
        this.totalElements = response.totalElements;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err); //todo
      },
    });
  }


  getId(item: Person): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return 'persons';
  }


  //location info
  isLocationModalVisible = false;
  selectedLocation: Location | undefined = undefined;

  openLocationModal(locationId: number): void {
    this.locationService.getLocations(
      undefined,undefined, undefined, locationId).subscribe({
      next: (response) => {
        const loc = response.content[0];
        if (loc) {
          this.selectedLocation =loc;
        } else {
          this.selectedLocation = undefined;
        }
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err); //todo
      },
    });
    this.isLocationModalVisible = true;
    // this.cd.detectChanges();

  }

  handleCancel(): void {
    this.isLocationModalVisible = false;
  }

  protected readonly name = name;
}
