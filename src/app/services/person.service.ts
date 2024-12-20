import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Page} from '../page';
import {DragonCave} from '../dragondto/dragoncave';
import {Person} from '../dragondto/person';
import {Country} from '../dragondto/country';
import {Color} from '../dragondto/color';

@Injectable(
  {providedIn: 'root'}
)
export class PersonService {
  private baseService = inject(BaseService);

  addPerson(formData: any) {
    return this.baseService.add(formData, "person/add");
  }
  deletePerson(formData: any) {
    return this.baseService.delete(formData, "person/delete/");
  }
  updatePerson(formData: any) {
    return this.baseService.update(formData, "person/update");
  }


  public getPersons(
    offset: number = 1,
    limit: number = 5,
    sort?: string | undefined,
    id?: string|undefined,
    canEdit?: undefined | boolean,
    userId?: number,
    name?: string,
    eyeColor?: Color,
    hairColor?: Color,
    location?:string,
    height?:number,
    passportID?:string,
    nationality?:Country,
  ): Observable<Page<Person>> {
    console.log("sdksldl")
    // console.log(this.baseService)
    const params = {
      offset: offset-1,
      limit: limit.toString(),
      sort,
      id: id?.toString(),
      canEdit: canEdit?.toString(),
      userId: userId?.toString(),
      locationId: location?.toString(),
      nationality: nationality?.toString(),
      passportID: passportID?.toString(),
      height:height?.toString(),
      hairColor: hairColor?.toString(),
      eyeColor: eyeColor?.toString(),
      name: name?.toString(),
    };

    return this.baseService.get<Page<Person>>('person/get', params);
  }


}
