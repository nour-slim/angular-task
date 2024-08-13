import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  data: Config = {};

  constructor(private http: HttpClient) {}

  load(defaults?: Config): Promise<Config> {
    if (environment.loginenable) {
      console.log('ConfigService: Loading configuration...');
    }

    return new Promise<Config>(resolve => {
      this.http.get<Config>('./assets/config.json').subscribe(
        response => {
          if (environment.loginenable) {
            console.log('ConfigService: Configuration loaded from server:', response);
          }
          this.data = Object.assign({}, defaults || {}, response || {});
          resolve(this.data);
        },
        error => {
          if (environment.loginenable) {
            console.error('ConfigService: Error loading configuration:', error);
          }
          console.log('ConfigService: Using default configuration');
          this.data = Object.assign({}, defaults || {});
          resolve(this.data);
        }
      );
    });
  }
}
