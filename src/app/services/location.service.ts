import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable(
  {providedIn: 'root'}
)
export class LocationService {
  private baseService = inject(BaseService);

  addLocation(formData: any) {
    return this.baseService.add(formData, "/location/addLocation");
  }

  updateLocation(formData: any) {
    return this.baseService.update(formData, "/location/updateLocation");
  }
  deleteLocation(formData: any) {
    return this.baseService.delete(formData, "/location/deleteLocation");
  }
}
