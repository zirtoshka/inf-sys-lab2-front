import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';

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
}
