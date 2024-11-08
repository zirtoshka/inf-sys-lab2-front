import { Component } from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {CoordinatesFormComponent} from '../forms/coordinates-form/coordinates-form.component';
import {DragonCaveFormComponent} from '../forms/dragoncave-form/dragoncave-form.component';
import {DragonHeadFormComponent} from '../forms/dragonhead-form/dragon-head-form.component';
import {LocationFormComponent} from '../forms/location-form/location-form.component';
import {DragonFormComponent} from '../forms/dragon-form/dragon-form.component';
import {PersonFormComponent} from '../forms/person-form/person-form.component';
import {NzDividerComponent} from 'ng-zorro-antd/divider';

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
    NzDividerComponent
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
