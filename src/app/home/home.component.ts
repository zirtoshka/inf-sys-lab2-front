import { Component } from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {TableComponent} from '../table/table.component';

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
    TableComponent
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
