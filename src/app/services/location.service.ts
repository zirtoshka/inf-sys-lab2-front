import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-tools/auth.service';
import {BaseService} from './base.service';

@Injectable(
  {providedIn: 'root'}
)
export class LocationService {
  private baseService = inject(BaseService);

  addLocation(formData: any) {
    return this.baseService.add(formData, "/location/addLocation");
  }
}
