import { Component ,NgModule,OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../services/signalR/signal-r.service';
import { StockQuotation } from '../../models/stock-quotation';
import { Subscription } from 'rxjs';
import { DxDataGridModule } from 'devextreme-angular';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-stock-quotation',
  templateUrl: './stock-quotation.component.html',
  styleUrls: ['./stock-quotation.component.scss'],
})
export class StockQuotationComponent implements OnInit, OnDestroy {
  stockQuotations: StockQuotation[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.signalRService.getStockQuotations(['101', '102', '103', '104', '105', '106', '107', '108', '109'])
        .subscribe(
          (data: StockQuotation[]) => {
            console.log('Stock quotations fetched:', data);
            this.stockQuotations = data;
          },
          (error) => {
            console.error('Error fetching stock quotations:', error);
          }
        )
    );

    // Listen for real-time stock quotations
    // this.subscriptions.add(
    //   this.signalRService.receiveStockQuotations().subscribe(
    //     (data: StockQuotation[]) => {
    //       console.log('Received stock quotations:', data);
    //       this.stockQuotations = data;
    //     },
    //     (error) => {
    //       console.error('Error receiving stock quotations:', error);
    //     }
    //   )
    // );
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
    this.subscriptions.unsubscribe();
  }

  
}

@NgModule({
  declarations: [
    StockQuotationComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule 
  ],
  exports: [
    StockQuotationComponent
  ]
})
export class StockQuotationModule { }
