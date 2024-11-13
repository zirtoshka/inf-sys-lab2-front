import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth-tools/auth.service';
import {Coordinates} from 'ng-zorro-antd/core/util';
import {DragonHead} from '../dragondto/dragonhead';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class HeadService {
  private baseService = inject(BaseService);

  addHead(formData:any) {
    return this.baseService.add(formData, "/head/addHead");
  }
}
