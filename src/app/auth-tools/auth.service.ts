import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {deleteCookie, getCookie, setCookie} from './cookie-utils';
import {catchError, lastValueFrom, throwError} from 'rxjs';
import {Token} from '../dtos/token';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import { jwtDecode } from "jwt-decode";


const TOKEN_PATH = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly baseUrl = 'http://localhost:8081/dragon/auth'; //todo change
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private notificationService = inject(NzNotificationService);


  // constructor(private messageService: NotificationComponent) {}

  // makeToast(message: string) {
  //   this.messageService.createErrorNotification();
  // }

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
    if (value == null) {
      deleteCookie(TOKEN_PATH);
      //todo add smth
      // sessionStorage.removeItem("shoot");
    } else {
      setCookie(TOKEN_PATH, value);
    }
  }

  get isLoggedIn(): boolean {
    return this.authToken != null;
  }



  decodeToken(): any {
    if(!this.isLoggedIn) {return null}
    const token = this.authToken;
    if (!token) {
      return null;
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Ошибка декодирования токена:', error);
      return null;
    }
  }

  isAdmin(): boolean {
    if (this.isLoggedIn){
      const decoded = this.decodeToken();
      return decoded?.role?.includes('ROLE_ADMIN') || false;
    }
    return false;
  }

  private auth(name: string, token: string) {
    this.authToken = token;
    this.username = name;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    lastValueFrom(this.httpClient.get(`http://localhost:8081/dragon/dragon/hello`, {headers})) //todo change
      .then(data => {
        this.router.navigate(['home']).then(() => {
        }).catch(err => {
          deleteCookie(TOKEN_PATH);
          // this.messageService.createErrorNotification();
          console.error('Navigation failed', err);
        });
      });
  }

  postData(username: string, password: string, action: string) {
    return this.httpClient
      .post<Token>(`${this.baseUrl}/${action}`, {"username": username, password})
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe((data) => {
        this.auth(username, data.token)
      });
  }

  loginOld(username: string, password: string) {
    return this.postData(username, password, "authenticate");
  }

  register(username: string, password: string) {
    return this.postData(username, password, "reg");
  }

  logout() {
    this.authToken = null;
    this.username = undefined;
    deleteCookie(TOKEN_PATH);
    this.router.navigate(['authenticate']);
  }

  private handleError(error: HttpErrorResponse) {
    deleteCookie(TOKEN_PATH);
    this.notificationService.error(
      'error Notification',
      error.message,
    );

    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }

  private authenticated = false;
  async isAuthenticated(): Promise<boolean> {
    alert("isAuthenticated")
    try {
      const response = await lastValueFrom(
        this.httpClient.get('http://localhost:8081/dragon/am/status', { withCredentials: true })
      );
      alert('User is authenticated: '.concat( response.toString()));  // Выводит "Authenticated" при успешной аутентификации
      return true;
    } catch (error) {
      // @ts-ignore
      alert('User is not authenticated: ' + error.message);
      return false;  // Возвращает false, если запрос неуспешен (например, 401 Unauthorized)
    }
  }


  login(): void {
    // Перенаправление пользователя на страницу входа OpenAM
    window.location.href = `http://localhost:8081/protected-openam`;
  }
}
