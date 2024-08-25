import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../services/signalR/signal-r.service';
import { GeneralService, ConnectionStates } from '../../services/signalR/general-hub-service.service';
@Component({
  selector: 'app-hub-status',
  templateUrl: './hub-status.component.html',
  styleUrl: './hub-status.component.scss'
})
export class HubStatusComponent implements OnInit{

  isPopupVisible: boolean;
  connectionState!: ConnectionStates;
  private statusInterval: any;

  constructor(private signalRService: SignalRService, private generalService: GeneralService) {
      this.isPopupVisible = false;
  }
  ngOnInit(): void {
    this.startStatusInterval();

    this.signalRService.getConnectionState().subscribe(state => {
      this.connectionState = state;
      console.log(`Current connection state: ${state}`);

    });
  }

  startStatusInterval(): void {
    this.statusInterval = setInterval(() => {
      this.signalRService.getConnectionState();
    }, 1000); 
  }
  

  togglePopup(): void {
      this.isPopupVisible = !this.isPopupVisible;
  }

  getConnectionStatus(): string {
    switch (this.connectionState) {
      case ConnectionStates.Reconnected:
        return 'Reconnected';
      case ConnectionStates.Reconnecting:
        return 'Reconnecting...';
      case ConnectionStates.Close:
        return 'Closed';
      default:
        return 'Unknown';
    }
  }
}
