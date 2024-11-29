import {Component, Injectable} from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-notification',
  imports: [
    NzButtonComponent
  ],
  standalone: true,
  templateUrl: './notification.component.html'
})

@Injectable({
  providedIn: 'root'
})

export class NotificationComponent {
  constructor(private notification: NzNotificationService) {}

  createBasicNotification(): void {
    this.notification
      .blank(
        'Notification Title',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }


  createSuccessNotification(): void {
    this.notification.success(
      'Success Notification',
      'This is the description of the success notification'
    );
  }

  createWarningNotification(): void {
    this.notification.warning(
      'warning Notification',
      'This is the description of the warning notification'
    );
  }

  createInfoNotification(): void {
    this.notification.info(
      'info Notification',
      'This is the description of the info notification'
    );
  }

  createErrorNotification(): void {
    this.notification.error(
      'error Notification',
      'This is the description of the error notification'
    );
  }




}
