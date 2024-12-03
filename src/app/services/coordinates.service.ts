import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Page} from '../page';
import {DragonCave} from '../dragondto/dragoncave';
import {Coordinates} from '../dragondto/coordinates';

@Injectable(
  {providedIn: 'root'}
)
export class CoordinatesService {
  private baseService = inject(BaseService);

  addCoordinates(formData: any) {
    return this.baseService.add(formData, "coord/add");
  }

  updateCoordinates(formData: any) {
    return this.baseService.update(formData, "coord/update");
  }


  deleteCoordinates(formData: any) {
    return this.baseService.delete(formData, "coord/delete");
  }

  public getCoordinates(
    offset: number = 0,
    limit: number = 5,
    sort?: string | undefined,
    id?: number|undefined,
    canEdit?: undefined | boolean,
    userId?: number,
    x?:number,
    y?:number,
  ): Observable<Page<Coordinates>> {
    const params = {
      offset: offset-1,
      limit: limit.toString(),
      sort,
      id: id?.toString(),
      canEdit: canEdit?.toString(),
      userId: userId?.toString(),
      x:x?.toString(),
      y:y?.toString(),
    };

    return this.baseService.get<Page<Coordinates>>('coord/get', params);
  }
}
