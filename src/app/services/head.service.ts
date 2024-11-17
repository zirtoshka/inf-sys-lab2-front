import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class HeadService {
  private baseService = inject(BaseService);

  addHead(formData:any) {
    return this.baseService.add(formData, "/head/addHead");
  }
  updateHead(formData: any) {
    return this.baseService.update(formData, "/head/update");
  }


  deleteHead(formData: any) {
    return this.baseService.delete(formData, "/head/delete");
  }
}
