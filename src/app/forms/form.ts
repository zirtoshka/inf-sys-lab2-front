import {Directive} from '@angular/core';


@Directive()
export abstract class FormEditable<T> {
  abstract setDefaultData(data: T | undefined): void ;
  abstract hideAddButtonFn():void;
}
