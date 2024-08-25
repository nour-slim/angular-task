import { Observable } from "rxjs";

// base-hub.ts
export abstract class BaseHub {
    protected abstract buildConnection(url: string): void;
    protected abstract startConnection(): Observable<void>;
    protected abstract invoke<T>(methodName: string, ...args: any[]): Observable<any>;
    // protected abstract storeData(key: string, data: any): void;
    // protected abstract getData(key: string): any;
  }
  