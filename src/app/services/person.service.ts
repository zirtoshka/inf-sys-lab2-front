import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-tools/auth.service';
import {BaseService} from './base.service';

@Injectable(
  {providedIn: 'root'}
)
export class PersonService {
  private baseService = inject(BaseService);

  addPerson(formData: any) {
    return this.baseService.add(formData, "/person/addPerson");
  }
}
