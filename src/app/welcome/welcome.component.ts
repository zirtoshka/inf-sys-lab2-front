import { Component } from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {TableComponent} from '../table/table.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NzButtonComponent,
    RouterLink,
    TableComponent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
