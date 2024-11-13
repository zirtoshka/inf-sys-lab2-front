import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth-tools/auth.service';
import {Observable} from 'rxjs';
import {Coordinates} from 'ng-zorro-antd/core/util';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DragonService {
  private readonly baseUrl = 'http://localhost:8080'; //todo change
  private baseService = inject(BaseService);

  addDragon(
    formData: any
  ) {
    return this.baseService.add(formData, "/dr/addDragon");
  }
}
