import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth-tools/auth.service';
import {DragonHead} from '../dragondto/dragonhead';

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

}
