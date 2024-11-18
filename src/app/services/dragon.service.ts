import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DragonService {
  private readonly baseUrl = 'http://localhost:8080'; //todo change
  private baseService = inject(BaseService);

  addDragon(
    formData: any
  ) {
    return this.baseService.add(formData, "/dr/addDragon");
  }

  updateDragon(
    formData: any
  ) {
    return this.baseService.update(formData, "/dr/updateDragon");
  }
  deleteDragon(
    formData: any
  ) {
    return this.baseService.delete(formData, "/dr/deleteDragon");
  }
}
