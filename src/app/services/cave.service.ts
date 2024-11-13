import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth-tools/auth.service';
import {Coordinates} from 'ng-zorro-antd/core/util';
import {DragonCave} from '../dragondto/dragoncave';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CaveService {
  private baseService = inject(BaseService);

  addCave(
    formData: any
  ) {
    return this.baseService.add(formData, "/cave/addCave");
  }
}
