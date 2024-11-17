import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable(
  {providedIn: 'root'}
)
export class CoordinatesService {
  private baseService = inject(BaseService);

  addCoordinates(formData: any) {
    return this.baseService.add(formData, "/coord/addCoordinates");
  }

  updateCoordinates(formData: any) {
    return this.baseService.update(formData, "/coord/updateCoordinates");
  }


  deleteCoordinates(formData: any) {
    return this.baseService.delete(formData, "/coord/deleteCoordinates");
  }
}
