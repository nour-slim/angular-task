import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {  catchError, delayWhen, Observable, retryWhen, tap, throwError, timer } from 'rxjs';
import { BaseHub } from '../../models/base-hub';
import { BehaviorSubject } from 'rxjs';

export enum ConnectionStates {
  Close = 'Closed',
  Reconnecting = 'Reconnecting',
  Reconnected = 'Reconnected',
  Connected = "Connected"
}

@Injectable({
  providedIn: 'root',
})
export class GeneralService extends BaseHub{
  private hubConnection!: signalR.HubConnection;
  private connectionStateSubject = new BehaviorSubject<ConnectionStates>(ConnectionStates.Close);
  public connectionState$ = this.connectionStateSubject.asObservable();
  private savedData: any[] = [];
  
  constructor() {
    super()
    
  }
  

  public override buildConnection(url: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidnRwaW52ZXN0bWVudCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJWdHBWZXN0aW9BUEkiOiJWdHBWZXN0aW9BUEkiLCJWdHBPbXNWZXN0aW9BUEkiOiJWdHBPbXNWZXN0aW9BUEkiLCJTY2hlZHVsZUFQSSI6IlNjaGVkdWxlQVBJIiwiT3JkZXJWYWxpZGF0aW9uQVBJIjoiT3JkZXJWYWxpZGF0aW9uQVBJIiwiTWFya2V0U3RhdHVzSHViIjoiTWFya2V0U3RhdHVzSHViIiwiVnRwTWFya2V0RGF0YUFQSSI6IlZ0cE1hcmtldERhdGFBUEkiLCJWdHBSZXBvcnRBUEkiOiJWdHBSZXBvcnRBUEkiLCJTdWJzY3JpcHRpb25BUEkiOiJTdWJzY3JpcHRpb25BUEkiLCJWdHBPbXNBUEkiOiJWdHBPbXNBUEkiLCJQYXltZW50R2F0ZXdheUFQSSI6IlBheW1lbnRHYXRld2F5QVBJIiwiU3RvY2tRdW90YXRpb25IdWIiOiJTdG9ja1F1b3RhdGlvbkh1YiIsIlRpbWVTYWxlSHViIjoiVGltZVNhbGVIdWIiLCJPcmRlckJvb2tCeVByaWNlSHViIjoiT3JkZXJCb29rQnlQcmljZUh1YiIsIk9yZGVyQm9va0J5T3JkZXJIdWIiOiJPcmRlckJvb2tCeU9yZGVySHViIiwiU2VjdG9ySHViIjoiU2VjdG9ySHViIiwic3ViIjoiZWVkY2JhM2QtMDhkYi00ZWYwLThlZDEtMDA3MjVkNDNhNTUyIiwidmVzdGlvdXNlcmlkIjoiMSIsInVzZXJ0eXBlIjoiMiIsImF1dGhfdGltZSI6IjE3MjQwNTU2NTAiLCJjbGllbnRfaWQiOiIyNiIsImV4cCI6MTcyNDA4NDQ1MCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6ImlzYSJ9.DVXKbbqLdEoBkTBoBVIXzN95tbQr_RkMen4e-h6x7t4' 
      })
      .build();
      this.hubConnection.onreconnecting(() => {
        console.log('Reconnecting...');
        this.connectionStateSubject.next(ConnectionStates.Reconnecting);
      });
  
      this.hubConnection.onreconnected(() => {
        console.log('Reconnected.');
        this.connectionStateSubject.next(ConnectionStates.Reconnected);
        this.restoreState();
      });

  
      this.hubConnection.onclose(() => {
        console.log('Connection closed.');
        this.connectionStateSubject.next(ConnectionStates.Close);
      });
    
      
  }

  public override startConnection(): Observable<void> {
    return new Observable<void>((observer) => {
      this.hubConnection
        .start()
        .then(() => {
          this.connectionStateSubject.next(ConnectionStates.Connected);
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public stopConnection(){
    this.hubConnection.stop().then(()=>{
    })
  }

  

  public override invoke<T>(methodName: string, ...args: any[]): Observable<T> {
    return new Observable<T>((observer) => {
      if (!this.hubConnection) {
        observer.error(new Error('Hub connection not initialized >:'));
        return;
      }
      this.hubConnection
        .invoke<T>(methodName, ...args)
        .then(
          (data: T) => observer.next(data),
          (error) => observer.error(error)
        )
        .catch((error) => {
          observer.error(error);
        });
    }).pipe(
      retryWhen(errors =>
        errors.pipe(
          tap(error => console.error('Fetch error:', error)),
          delayWhen(() => timer(2000)),
          tap(() => console.log('Retrying... <;'))
        )
      ),
      catchError(error => {
        console.error('Failed after retries:', error);
        return throwError(error);
      })
    );
  }

  
  public onServerEvent(eventName: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.hubConnection.on(eventName, (data) => {
        observer.next(data);
      });
    });
  }
  

  // public ConnectionEvents(): void {
  //   this.hubConnection.onclose((error) => {
  //     console.error('Hub was Closed >:', error);
  //     this.state = ConnectionStates.close;
  //     this.message = "Closed >:";
  //     this.updateState();
  //   });

  //   this.hubConnection.onreconnecting((error) => {
  //     console.log("Hub is Reconnecting /:", error);
  //     this.state = ConnectionStates.reconnecting;
  //     this.message = "Reconnecting /:";
  //     this.updateState();
  //   });

  //   this.hubConnection.onreconnected((error) => {
  //     console.log("Hub is Reconnected <:", error);
  //     this.state = ConnectionStates.reconnected;
  //     this.message = "Reconnected <:";
  //     const restoredData = this.restoreState();
  //     console.log(restoredData);
  //     this.updateState();
  //   });
  // }

  // private updateState() {
  //   this.stateSubject.next(this.state);
  //   this.messageSubject.next(this.message);
  // }
  private saveState(data: any[]): void {
    console.log('Saving state...');
    this.savedData = [...data]; 
    localStorage.setItem('savedData', JSON.stringify(this.savedData));
  }

  private restoreState(): any[] {
    console.log('Restoring state...');
     const savedState = localStorage.getItem('savedData');
     this.savedData = savedState ? JSON.parse(savedState) : [];
    return this.savedData; 
  }
}
