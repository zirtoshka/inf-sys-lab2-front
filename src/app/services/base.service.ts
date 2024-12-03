import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth-tools/auth.service';
import {Observable} from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class BaseService {
  private readonly baseUrl: string = 'http://localhost:8080/dragon/';
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  isAdmin() {
    return this.authService.isAdmin();
  }

  add(formData: any, action: string) {
    const jwtToken = this.authService.authToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.httpClient
      .post<any>(this.baseUrl + action, formData, {headers});

  }


  update(formData: any, action: string) {
    const jwtToken = this.authService.authToken;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${jwtToken}`)
      .set('Content-Type', 'application/json');
    return this.httpClient
      .post<any>(this.baseUrl + action, formData, {headers});
  }


  delete(formData: any, action: string) {
    const jwtToken = this.authService.authToken;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${jwtToken}`)
      .set('Content-Type', 'application/json');
    return this.httpClient
      .delete<any>(this.baseUrl + action + formData.id, {headers});
  }

  public get<T>(
    endpoint: string,
    params: { [key: string]: any } = {}
  ): Observable<T> {
    const jwtToken = this.authService.authToken;
    let headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.httpClient.get<T>(`${this.baseUrl}${endpoint}`, {headers, params: httpParams});
  }


}
