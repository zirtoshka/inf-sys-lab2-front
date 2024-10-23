import { Component } from '@angular/core';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzPageHeaderComponent
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  onBack(): void {
    console.log('onBack');
  }
}
