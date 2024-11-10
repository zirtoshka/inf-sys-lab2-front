import {Component, ViewChild} from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {CoordinatesFormComponent} from '../forms/coordinates-form/coordinates-form.component';
import {DragonCaveFormComponent} from '../forms/dragoncave-form/dragoncave-form.component';
import {DragonHeadFormComponent} from '../forms/dragonhead-form/dragon-head-form.component';
import {LocationFormComponent} from '../forms/location-form/location-form.component';
import {DragonFormComponent} from '../forms/dragon-form/dragon-form.component';
import {PersonFormComponent} from '../forms/person-form/person-form.component';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {FormState} from './states';
import {CoordinatesTableComponent} from '../tables/coordinates-table/coordinates-table.component';
import {DragonTableComponent} from '../tables/dragon-table/dragon-table.component';
import {LocationTableComponent} from '../tables/location-table/location-table.component';
import {PersonTableComponent} from '../tables/person-table/person-table.component';
import {DragoncaveTableComponent} from '../tables/dragoncave-table/dragoncave-table.component';
import {DragonheadTableComponent} from '../tables/dragonhead-table/dragonhead-table.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NzHeaderComponent,
    NzLayoutComponent,
    NzBreadCrumbItemComponent,
    NzBreadCrumbComponent,
    NzContentComponent,
    NzFooterComponent,
    NzMenuItemComponent,
    NzMenuDirective,
    RouterLink,
    NgOptimizedImage,
    CoordinatesFormComponent,
    DragonCaveFormComponent,
    DragonHeadFormComponent,
    LocationFormComponent,
    DragonFormComponent,
    PersonFormComponent,
    NzDividerComponent,
    NgIf,
    CoordinatesTableComponent,
    DragonTableComponent,
    LocationTableComponent,
    PersonTableComponent,
    DragoncaveTableComponent,
    DragonheadTableComponent
  ],
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  currentState: FormState = FormState.Dragon;

  isDragonChoose() {
    this.currentState = FormState.Dragon;
  }

  isCoordinatesChoose() {
    this.currentState = FormState.Coordinates;
  }

  isLocationChoose() {
    this.currentState = FormState.Location;
  }

  isPersonChoose() {
    this.currentState = FormState.Person;
  }

  isCaveChoose() {
    this.currentState = FormState.Cave;
  }
  isHeadChoose() {
    this.currentState = FormState.Head;
  }
}
