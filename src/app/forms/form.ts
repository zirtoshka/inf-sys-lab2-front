import {Directive, inject} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';


@Directive()
export abstract class FormEditable<T> {
  protected notificationService = inject(NzNotificationService);
  abstract setDefaultData(data: T | undefined): void ;
  abstract hideAddButtonFn():void;

}
