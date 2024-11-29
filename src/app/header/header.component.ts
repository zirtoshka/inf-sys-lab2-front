import { Component } from '@angular/core';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {routes} from '../app.routes';
import {Router, RouterLink, Routes} from '@angular/router';
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-header',
  imports: [
    NzPageHeaderComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzIconDirective,
    NzButtonComponent,
    RouterLink
  ],
  standalone: true,
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onBack(): void {
    console.log('onBack');
    this.router.navigate(['/']);
  }
}
