import {inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable, throwError} from 'rxjs';
import {Page} from '../page';
import {Application, Status} from '../application';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseService = inject(BaseService);

  addApplication() {
    return this.baseService.add(undefined,"app/add"); //todo check undefined
  }

  updateApp(formData: any) {
    if (!this.baseService.isAdmin()) {
      return throwError(() => new Error('Access denied: Only admins can fetch applications'));
    }
    return this.baseService.update(formData, "app/changeStatus");
  }

  getApp(
    offset: number = 0,
    limit: number = 5,
    sort?: string | undefined,
    id?: number,
    userId?: number,
    createdAt?: string,
    status?: Status
  ): Observable<Page<Application>> {
    if (!this.baseService.isAdmin()) {
      return throwError(() => new Error('Access denied: Only admins can fetch applications'));
    }

    const params = {
      offset: offset - 1,
      limit: limit.toString(),
      sort,
      id: id?.toString(),
      userId: userId?.toString(),
      createdAt: createdAt,
      status: status
    };

    return this.baseService.get<Page<Application>>('app/get', params);
  }

}
