import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Page} from '../page';
import {DragonCave} from '../dragondto/dragoncave';
import {DragonHead} from '../dragondto/dragonhead';

@Injectable({
  providedIn: 'root'
})
export class HeadService {
  private baseService = inject(BaseService);

  addHead(formData:any) {
    return this.baseService.add(formData, "head/add");
  }
  updateHead(formData: any) {
    return this.baseService.update(formData, "head/update");
  }


  deleteHead(formData: any) {
    return this.baseService.delete(formData, "head/delete/");
  }

  public getHeads(
    offset: number = 0,
    limit: number = 5,
    sort?: string | undefined,
    id?: number|undefined,
    canEdit?: undefined | boolean,
    userId?: number,
    eyesCount?: number
  ): Observable<Page<DragonHead>> {
    const params = {
      offset: offset-1,
      limit: limit.toString(),
      sort,
      id: id?.toString(),
      canEdit: canEdit?.toString(),
      userId: userId?.toString(),
      eyesCount: eyesCount?.toString(),
    };

    return this.baseService.get<Page<DragonHead>>('head/get', params);
  }
}
