import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NotificationComponent} from '../notification/notification.component';
import {deleteCookie, getCookie} from './cookie-utils';
import {catchError, lastValueFrom, throwError} from 'rxjs';
import {Token} from '../dtos/token';

const TOKEN_PATH = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly baseUrl = 'http://localhost:8000/dragon/auth';
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private messageService = inject(NotificationComponent);

  get username(): string | null {
    return sessionStorage.getItem("username");
  }

  set username(value: string | null | undefined) {
    if (value == null) {
      sessionStorage.removeItem("username");
    } else {
      sessionStorage.setItem("username", value);
    }
  }

  get authToken(): string | null {
    return getCookie(TOKEN_PATH);
  }

  set authToken(value: string | null | undefined) {
    if (value==null){
      deleteCookie(TOKEN_PATH);
      //todo add smth
      // sessionStorage.removeItem("shoot");
    }
  }

  get isLoggedIn(): boolean {
    return this.authToken != null;
  }

  private auth(name:string, token:string){
    this.authToken = token;
    this.username=name;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` );
    lastValueFrom(this.httpClient.get(`${this.baseUrl}/users/${name}`, { headers }))
      .then(data => {
        this.router.navigate(['home']).then(() => {
          console.log('Navigation to home successful');
        }).catch(err => {
          this.messageService.createErrorNotification();
          console.error('Navigation failed', err);
        });
      });
  }

  postData(username:string, password: string, action: string){
    try {
      // Выполняем POST запрос, преобразуем результат из Observable в Promise
      const tokenResponse = lastValueFrom(
        this.httpClient.post<Token>(`${this.baseUrl}/${action}`, { name: username, password })
          .pipe(
            catchError(this.handleError) // Обработка ошибок
          )
      );

      // Аутентификация пользователя с использованием токена
      this.auth(username, Token.name);

    } catch (error) {
      console.error('Login failed', error); // Логирование ошибки, если что-то пошло не так
    }
  }

  login(username: string, password: string){
    return this.postData(username, password, "authenticate");
  }


  private handleError(error: HttpErrorResponse) {
    this.messageService.createErrorNotification();
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
