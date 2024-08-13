import { NgModule, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularSplitModule, SplitGutterInteractionEvent } from 'angular-split';
import { LayoutService } from '../../services/layout.service';
import { UserStoreService } from '../../services/user-store.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { DxSplitterModule } from 'devextreme-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  firstAreaSize = 50;
  secondAreaSize = 50;
  firstVerticalAreaSize = 50;
  secondVerticalAreaSize = 50;
  private subscriptions: Subscription[] = []; 
  isLocked = false;
  username: string = '';

  constructor(private layoutService: LayoutService, private userStore: UserStoreService) {}
  
  ngOnInit(): void {
    console.log("ngOnInit HomeComponent");
    
    const usersubsc = this.userStore.getUsername().subscribe(username => { 
      this.username = username;
      this.loadLayoutSettings(); 
    });
    this.subscriptions.push(usersubsc)
  }

  ngOnDestroy(): void {
    if (environment) {
      console.log("ngOnDestroy HomeComponent");
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  onDragEnd(event: SplitGutterInteractionEvent): void {
    this.firstAreaSize = this.extractSize(event.sizes[0]);
    this.secondAreaSize = this.extractSize(event.sizes[1]);
    this.saveLayoutSettings();
  }

  onVerticalDragEnd(event: SplitGutterInteractionEvent): void {
    this.firstVerticalAreaSize = this.extractSize(event.sizes[0]);
    this.secondVerticalAreaSize = this.extractSize(event.sizes[1]);
    this.saveLayoutSettings();
  }

  extractSize(areaSize: any): number {
    return typeof areaSize === 'string' ? parseFloat(areaSize) : areaSize;
  }

  toggleLock() {
    this.isLocked = !this.isLocked;
    this.saveLayoutSettings();
  }

  saveLayoutSettings(): void {
    const layoutSettings = {
      firstAreaSize: this.firstAreaSize,
      secondAreaSize: this.secondAreaSize,
      firstVerticalAreaSize: this.firstVerticalAreaSize,
      secondVerticalAreaSize: this.secondVerticalAreaSize,
      isLocked: this.isLocked
    };
    const saveSubscription = this.layoutService.saveLayoutSettings(this.username, layoutSettings).subscribe();
    this.subscriptions.push(saveSubscription);
  }

  loadLayoutSettings(): void {
    const layoutSettings = localStorage.getItem('layoutSettings');
    if (layoutSettings) {
      const parsedLayout = JSON.parse(layoutSettings); 
      this.firstAreaSize = parsedLayout.firstAreaSize;
      this.secondAreaSize = parsedLayout.secondAreaSize;
      this.firstVerticalAreaSize = parsedLayout.firstVerticalAreaSize;
      this.secondVerticalAreaSize = parsedLayout.secondVerticalAreaSize;
      this.isLocked = parsedLayout.isLocked;
    }
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DxSplitterModule,
    AngularSplitModule
  ]
})
export class HomeModule { }
