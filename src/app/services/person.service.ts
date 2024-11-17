import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable(
  {providedIn: 'root'}
)
export class PersonService {
  private baseService = inject(BaseService);

  addPerson(formData: any) {
    return this.baseService.add(formData, "/person/addPerson");
  }
  deletePerson(formData: any) {
    return this.baseService.add(formData, "/person/deletePerson");
  }
  updatePerson(formData: any) {
    return this.baseService.add(formData, "/person/updatePerson");
  }
}
