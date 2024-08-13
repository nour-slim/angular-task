import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private username$ = new BehaviorSubject<string>('');
  
  private email$ = new BehaviorSubject<string>('');
  private firstname$ = new BehaviorSubject<string>('');
  private lastname$ = new BehaviorSubject<string>('');

  constructor() {
  }

  public getUsername() {
    return this.username$.asObservable();
  }

  public setUsername(username: string) {
    this.username$.next(username);
  }
  public getEmail() {
    return this.email$.asObservable();
  }

  public setEmail(email: string) {
    this.email$.next(email);
  }

  public getFirstName() {
    return this.firstname$.asObservable();
  }

  public setFirstName(firstname: string) {
    this.firstname$.next(firstname);
  }
  public getLastName() {
    return this.lastname$.asObservable();
  }

  public setLastName(lastname: string) {
    this.lastname$.next(lastname);
  }
}
