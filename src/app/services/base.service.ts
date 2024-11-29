import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth-tools/auth.service';
import {DragonHead} from '../dragondto/dragonhead';
import {Observable} from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class BaseService {
  private readonly baseUrl: string = 'http://localhost:8080/dragon/user';
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  add(formData: any, action: string) {
    const jwtToken = this.authService.authToken;
    let headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${jwtToken}`);
    return this.httpClient
      .post<any>(this.baseUrl + action, JSON.stringify(formData), {headers: headers});

  }


  update(formData: any, action: string) {
    const jwtToken = this.authService.authToken;
    let headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${jwtToken}`);
    return this.httpClient
      .post<any>(this.baseUrl + action, JSON.stringify(formData), {headers: headers});
  }



  delete(formData: any, action: string) {
    const jwtToken = this.authService.authToken;
    let headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${jwtToken}`);
    return this.httpClient
      .post<any>(this.baseUrl + action, JSON.stringify(formData), {headers: headers});
  }

  public get<T>(
    endpoint: string,
    params: { [key: string]: any } = {}
  ): Observable<T> {
    const jwtToken = this.authService.authToken;
    let headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    let httpParams = new HttpParams();

    // Добавляем параметры в запрос
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    return this.httpClient.get<T>(`${this.baseUrl}/${endpoint}`, { headers, params: httpParams });
  }
}
