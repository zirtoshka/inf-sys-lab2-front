import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {DragonCave} from '../dragondto/dragoncave';
import {Page} from '../page';




@Injectable({
  providedIn: 'root'
})
export class CaveService {
  private baseService = inject(BaseService);

  addCave(formData: any) {
    return this.baseService.add(formData, "cave/add");
  }

  updateCave(formData: any) {
    return this.baseService.update(formData, "cave/update");
  }

  deleteCave(formData: any) {
    return this.baseService.delete(formData, "cave/delete/");
  }

  public getCaves(
    offset: number = 1,
    limit: number = 5,
    sort?: string | undefined,
    id?: string|undefined,
    canEdit?: undefined | boolean,
    userId?: number,
    numberOfTreasures?: number
  ): Observable<Page<DragonCave>> {
    const params = {
      offset: offset-1,
      limit: limit.toString(),
      sort,
      id: id?.toString(),
      canEdit: canEdit?.toString(),
      userId: userId?.toString(),
      numberOfTreasures: numberOfTreasures?.toString(),
    };

    return this.baseService.get<Page<DragonCave>>('cave/get', params);
  }

}
