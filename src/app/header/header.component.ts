import { Component } from '@angular/core';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {routes} from '../app.routes';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzPageHeaderComponent
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onBack(): void {
    console.log('onBack');
    this.router.navigate(['/']);
  }
}
