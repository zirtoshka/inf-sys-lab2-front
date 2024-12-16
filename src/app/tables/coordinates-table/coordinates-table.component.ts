import {ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Coordinates} from '../../dragondto/coordinates';

import {FormsModule} from '@angular/forms';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NgClass, NgForOf} from '@angular/common';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {CoordinatesFormComponent} from '../../forms/coordinates-form/coordinates-form.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {CoordinatesService} from '../../services/coordinates.service';
import {WebSocketService} from '../../websocket.service';
import {DtoTable} from '../dto-table';
import {DragonCave} from '../../dragondto/dragoncave';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-coordinates-table',
  imports: [
    NzTableComponent,
    NzThAddOnComponent,
    NzPaginationComponent,
    NgForOf,
    FormsModule,
    NzPopconfirmDirective,
    NzInputDirective,
    CoordinatesFormComponent,
    NzButtonComponent,
    NzModalComponent,
    NzRadioComponent,
    NzIconDirective,
    NgClass,
  ],
  providers: [NzModalService, WebSocketService],
  templateUrl: './coordinates-table.component.html',
  standalone: true,
  styleUrl: './coordinates-table.component.css'
})
export class CoordinatesTableComponent extends DtoTable<Coordinates> {
  private coordinatesService = inject(CoordinatesService);
  @ViewChild(CoordinatesFormComponent) declare formComponent: CoordinatesFormComponent;

  constructor(cd: ChangeDetectorRef) {
    super(cd, inject(WebSocketService));
    this.sortOrder = {
      id: undefined,
      x: undefined,
      y: undefined
    };
    this.filters = {
      id: undefined,
      x: undefined,
      y: undefined,
      canEdit: undefined,
    }
  }

  loadData(page: number, size: number, sort?: string, filters?: Record<string, any>): void {
    this.coordinatesService.getCoordinates(page, size, sort,
      filters?.['id'], filters?.['canEdit'], undefined,
      filters?.['x'], filters?.['y']
    ).subscribe({
      next: (response) => {
        this.listOfData = response.content.map(coord => ({
          id: coord.id,
          x: coord.x,
          y: coord.y,
          canEdit: coord.canEdit,
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

  deleteRow(id: number): void {
    this.coordinatesService.deleteCoordinates(
      {id: id})
      .subscribe((res) => {
        console.log(res);
      })
  }

  handleOk() {
    this.formComponent.updateCoordinates();
    this.isEditModalVisible = false;
  }

  getId(item: Coordinates): any {
    return item.id;
  }

  getWebSocketTopic(): string {
    return 'coordinates';
  }

}
