import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {deleteCookie, getCookie, setCookie} from './cookie-utils';
import {catchError, lastValueFrom, throwError} from 'rxjs';
import {Token} from '../dtos/token';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import { jwtDecode } from "jwt-decode";


const TOKEN_PATH = 'iPlanetDirectoryPro';

interface AuthStatusResponse {
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8081/dragon/auth'; //todo change
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private notificationService = inject(NzNotificationService);

  get username(): string | null {
    return sessionStorage.getItem("username");
  }

  set username(value: string | null) {
    if (value == null) {
      sessionStorage.removeItem("username");
    } else {
      sessionStorage.setItem("username", value);
    }
  }

  get roles(): Array<string> {
    const json = sessionStorage.getItem("roles") ?? "[]";
    const result = JSON.parse(json);
    if (!Array.isArray(result)) {
      return [];
    }

    return result;
  }

  set roles(value: Array<string> | null | undefined) {
    if (!Array.isArray(value)) {
      value = [];
    }

    sessionStorage.setItem("roles", JSON.stringify(value));
  }

  get authToken(): string | null {
    return getCookie(TOKEN_PATH);
  }

  set authToken(value: string | null | undefined) {
    if (value == null) {
      deleteCookie(TOKEN_PATH);
    } else {
      setCookie(TOKEN_PATH, value);
    }
  }

  get isLoggedIn(): boolean {
    return this.authToken != null;
  }

  isAdmin(): boolean {
    return this.roles.includes("ROLE_ADMIN");
  }

  logout() {
    this.authToken = null;
    this.username = null;
    this.roles = [];
  }

  async fetchStatus(): Promise<void> {
    try {
      const req = await lastValueFrom(this.httpClient.get<AuthStatusResponse>('http://localhost:8081/dragon/am/status', {withCredentials: true}));

      this.username = req.username;
      this.roles = req.roles;
    } catch (error) {
      this.authToken = null;
    }
  }

  login(): void {
    // Перенаправление пользователя на страницу входа OpenAM
    const curPage = window.location.href;
    window.location.href = `http://localhost:8080/openam/XUI/?goto=${encodeURIComponent(curPage)}#login`;
  }
}
