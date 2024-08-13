import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';
import { LayoutService } from './layout.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7269/api/User/";
  private userPayload: any;
 

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStoreService,
    private layoutService: LayoutService
  ) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj).pipe(
      tap((response) => {
        if (response.token) {
          this.storeToken(response.token);
          this.userPayload = this.decodedToken();
          const username = loginObj.username;
          if (username) {
            this.userStore.setUsername(username);
            this.loadUserLayout(username);
          }
        }
      })
    );
  }

  getUsernameFromToken() {
    if (this.userPayload) {
      return this.userPayload.username;
    }
    return null;
  }



  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  loadUserLayout(username: string) {
    this.layoutService.getLayoutSettings(username).subscribe((data: any) => {
      if (data && data.layoutSettings) {
        localStorage.setItem('layoutSettings', data.layoutSettings);
      }
    });
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }
}
