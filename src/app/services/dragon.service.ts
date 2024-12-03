import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Page} from '../page';
import {Dragon} from '../dragondto/dragon';
import {Color} from '../dragondto/color';
import {DragonCharacter} from '../dragondto/dragoncharacter';

@Injectable({
  providedIn: 'root'
})
export class DragonService {
  private baseService = inject(BaseService);

  addDragon(formData: any) {
    return this.baseService.add(formData, "dragon/add");
  }

  updateDragon(formData: any) {
    return this.baseService.update(formData, "dragon/update");
  }

  deleteDragon(formData: any) {
    return this.baseService.delete(formData, "dragon/delete");
  }

  public getDragons(
    offset: number = 0,
    limit: number = 5,
    sort?: string | undefined,
    id?: number | undefined,
    canEdit?: undefined | boolean,
    userId?: number,
    name?: string,
    coordinatesId?: number,
    creationDate?: string,
    caveId?: number,
    killerId?: number,
    age?: number,
    wingspan?: number,
    color?: Color,
    character?: DragonCharacter,
    headCount?: number,
  ): Observable<Page<Dragon>> {
    const params = {
      offset: offset - 1,
      limit: limit.toString(),
      sort,
      id: id?.toString(),
      canEdit: canEdit?.toString(),
      userId: userId?.toString(),
      name: name?.toString(),
      coordinatesId: coordinatesId?.toString(),
      creationDate: creationDate?.toString(),
      caveId: caveId?.toString(),
      killerId: killerId?.toString(),
      age: age?.toString(),
      wingspan: wingspan?.toString(),
      color: color?.toString(),
      character: character?.toString(),
      headCount: headCount?.toString(),
    };

    return this.baseService.get<Page<Dragon>>('dragon/get', params);
  }


}
