import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StockQuotation } from '../../models/stock-quotation';
import { ConnectionStates, GeneralService } from './general-hub-service.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {

  constructor(private generalService: GeneralService) {
    this.generalService.buildConnection("https://tradeapi.ids-fintech.com:443/Hub.StockQuotation/StockQuotationHub");
    this.generalService.startConnection().subscribe(
      () => console.log('Connection established.'),
      (error) => console.error('Connection error:', error)
    );
  }
  
 
  getStockQuotations(stockIds: string[]): Observable<StockQuotation[]> {
    return this.generalService.invoke<StockQuotation[]>('GetStockQuotations', stockIds).pipe(
      catchError(error => {
        console.error('Failed fetching stock quotations:', error);
        return throwError(error); 
      })
    );
  }


  stopConnection(): void {
    this.generalService.stopConnection();
    console.log("Stopped the connection.");
  }

  public getConnectionState(): Observable<ConnectionStates> {
    return this.generalService.connectionState$;
  }
}
