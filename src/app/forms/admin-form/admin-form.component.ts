import {Component, inject} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {AuthService} from '../../auth-tools/auth.service';
import {NgIf} from '@angular/common';
import {ApplicationService} from '../../services/application.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

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
  private notificationService = inject(NzNotificationService);


  private appService = inject(ApplicationService);

  constructor(protected authService: AuthService) {
  }

  sendApp() {
    this.appService.addApplication().subscribe({
      next: (response) => {
        this.notificationService.success(
          'Success',
          "Your application has been added successfully."
        );
      },
      error: (error) => {
        this.notificationService.error(
          'Oops',
          "Your application failed to add an application"
        );
      }
    });
  }
}
