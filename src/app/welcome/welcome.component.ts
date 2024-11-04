import { Component } from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {TableComponent} from '../table/table.component';
import {Table2Component} from '../table2/table2.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NzButtonComponent,
    RouterLink,
    TableComponent,
    Table2Component
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
