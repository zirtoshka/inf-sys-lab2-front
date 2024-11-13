import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotificationComponent} from '../notification/notification.component';
import {deleteCookie, getCookie, setCookie} from './cookie-utils';
import {catchError, lastValueFrom, throwError} from 'rxjs';
import {Token} from '../dtos/token';
import {NzNotificationService} from 'ng-zorro-antd/notification';

const TOKEN_PATH = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/dragon/auth'; //todo change
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private notificationService = inject(NzNotificationService); // Use NzNotificationService directly


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

  private auth(name: string, token: string) {
    console.log(token);
    this.authToken = token;
    this.username = name;
    let headers = new HttpHeaders();
    console.log("3333");
    headers = headers.set('Authorization', `Bearer ${token}`);
    console.log("444");
    lastValueFrom(this.httpClient.get(`http://localhost:8080/dragon/user/hello`, {headers})) //todo change
      .then(data => {
        this.router.navigate(['home']).then(() => {
          console.log('Navigation to home successful');
        }).catch(err => {
          deleteCookie(TOKEN_PATH);
          console.log("ogogogo");
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

  login(username: string, password: string) {
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
}
