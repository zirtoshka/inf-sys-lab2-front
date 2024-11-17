import {inject, Injectable} from '@angular/core';
import {Coordinates} from 'ng-zorro-antd/core/util';
import {AuthService} from '../auth-tools/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';

@Injectable(
  {providedIn: 'root'}
)
export class CoordinatesService {
  private baseService = inject(BaseService);

  addCoordinates(
    formData: any
  ) {
    return this.baseService.add(formData, "/coord/addCoordinates");
  }

  updateCoordinates(
    formData: any
  ) {
    return this.baseService.update(formData, "/coord/updateCoordinates");
  }
}
