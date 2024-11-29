import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {DragonCave} from '../dragondto/dragoncave';
import {HttpHeaders, HttpParams} from '@angular/common/http';

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}


@Injectable({
  providedIn: 'root'
})
export class CaveService {
  private baseService = inject(BaseService);

  addCave(formData: any) {
    return this.baseService.add(formData, "/cave/addCave");
  }

  updateCave(formData: any) {
    return this.baseService.update(formData, "/cave/updateCave");
  }
  deleteCave(formData: any) {
    return this.baseService.delete(formData, "/cave/deleteCave");
  }

  public getCaves(
    offset: number = 0,
    limit: number = 5,
    sort: string ='ID_ASC',
    id?: number,
    canEdit?: boolean,
    userId?: number,
    treasure?: number
  ): Observable<Page<DragonCave>> {
    const params = {
      offset: offset.toString(),
      limit: limit.toString(),
      sort,
      id: id?.toString(),
      canEdit: canEdit?.toString(),
      userId: userId?.toString(),
      numberOfTreasures: treasure?.toString(),
    };

    return this.baseService.get<Page<DragonCave>>('cave/get', params);
  }

}
