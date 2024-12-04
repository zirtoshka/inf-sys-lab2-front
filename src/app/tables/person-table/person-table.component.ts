import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {Person} from '../../dragondto/person';
import {Color} from '../../dragondto/color';
import {Country} from '../../dragondto/country';
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
import {DragonCave} from '../../dragondto/dragoncave';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';

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

  loadData(page: number, size: number, sort?: string, filters?: Record<string, any>): void {
    this.personService.getCaves(page, size, sort,
      filters?.['id'], filters?.['canEdit'], undefined,
      filters?.['treasures']
    ).subscribe({
      next: (response) => {
        this.listOfData = response.content.map(person => ({
          id: person.id,
          name: person.name,
          eyeColor: person.eyeColor,
          hairColor: person.hairColor,
          location: person.location,
          height: person.height,
          passportID: person.passportID,
          nationality: person.nationality,
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
  selectedLocation: Location | null = null;

  openLocationModal(location: Location): void {
    this.selectedLocation = location;
    this.isLocationModalVisible = true;
    // this.cd.detectChanges();

  }

  handleCancel(): void {
    this.isLocationModalVisible = false;
  }

  protected readonly name = name;
}
