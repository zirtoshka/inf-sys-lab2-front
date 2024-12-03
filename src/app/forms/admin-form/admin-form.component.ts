import {Component, inject} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {AuthService} from '../../auth-tools/auth.service';
import {NgIf} from '@angular/common';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-admin-form',
  imports: [
    NzButtonComponent,
    NgIf
  ],
  templateUrl: './admin-form.component.html',
  standalone: true,
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {

  private appService = inject(ApplicationService);

  constructor(protected authService: AuthService) {
  }

  sendApp() {
    this.appService.addApplication()
      ?.subscribe((response) => {
          console.log('Request successful:', response);
        },
        (error) => {
          console.error('Request failed:', error);
        })
    ;
  }
}
