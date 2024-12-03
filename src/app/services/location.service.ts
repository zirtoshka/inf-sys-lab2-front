import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Page} from '../page';
import {Location} from '../dragondto/location';

@Injectable(
  {providedIn: 'root'}
)
export class LocationService {
  private baseService = inject(BaseService);

  addLocation(formData: any) {
    return this.baseService.add(formData, "loc/add");
  }

  updateLocation(formData: any) {
    return this.baseService.update(formData, "loc/update");
  }

  deleteLocation(formData: any) {
    return this.baseService.delete(formData, "loc/delete");
  }

  public getLocations(
    offset: number = 0,
    limit: number = 5,
    sort?: string | undefined,
    id?: number | undefined,
    canEdit?: undefined | boolean,
    userId?: number,
    name?: string,
    x?: number,
    y?: number,
    z?: number
  ): Observable<Page<Location>> {
    const params = {
      offset: offset - 1,
      limit: limit.toString(),
      sort,
      id: id?.toString(),
      canEdit: canEdit?.toString(),
      userId: userId?.toString(),
      name: name?.toString(),
      x: x?.toString(),
      y:y?.toString(),
      z: z?.toString()
    };
    return this.baseService.get<Page<Location>>('loc/get', params);
  }
}
