import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private apiUrl = 'https://localhost:7269/api/Layout';

  constructor(private http: HttpClient) {}

  saveLayoutSettings(username: string, layoutSettings: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, { username, layoutSettings: JSON.stringify(layoutSettings) });
  }

  getLayoutSettings(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${username}`);
  }
}
