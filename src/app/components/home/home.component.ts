import { NgModule, Component, OnInit, OnDestroy ,CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef, ComponentFactoryResolver, Injector, ApplicationRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { UserStoreService } from '../../services/user-store.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { DxSplitterModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import {  StockQuotationComponent, StockQuotationModule } from '../stock-quotation/stock-quotation.component';
import { GoldenLayout, LayoutConfig, ResolvedLayoutConfig,  } from 'golden-layout';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy , AfterViewInit{
  firstAreaSize = 50;
  secondAreaSize = 50;
  firstVerticalAreaSize = 50;
  secondVerticalAreaSize = 50;
  private subscriptions: Subscription[] = []; 
  isLocked = false;
  username: string = '';

  constructor(private layoutService: LayoutService, 
    private userStore: UserStoreService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private themeService : ThemeService
  ) {}

  @ViewChild('layoutContainer', { static: true }) layoutContainer!: ElementRef;
  private myLayout!: GoldenLayout;
  
  ngAfterViewInit(): void {
    this.initializeLayout();
  }

  initializeLayout(): void {
    const config: LayoutConfig = {
      root: {
        type: 'row',
        content: [
          {
            type: 'component',
            componentType: 'StockQuotationComponent', 
            title: ' Stock Quotation',
            // componentState: { label: 'A' }
          },
          {
            type: 'column',
            content: [
              {
                type: 'component',
                componentType: 'testComponent', 
                title: 'Component B',
                componentState: { label: 'I will add a component here' }
              },
              {
                type: 'component',
                componentType: 'testComponent', 
                title: 'Component C',
                componentState: { label: 'Hon kmn' }
              }
            ]
          }
        ]
      }
    };
    

    this.myLayout = new GoldenLayout(config, this.layoutContainer.nativeElement);

    this.myLayout.registerComponentFactoryFunction('StockQuotationComponent', (container, componentState) => {
      const factory = this.componentFactoryResolver.resolveComponentFactory(StockQuotationComponent);
      const componentRef = factory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);
      container.element.appendChild((componentRef.hostView as any).rootNodes[0]);
    });
    this.myLayout.registerComponent('testComponent', (container, componentState) => {
      if (componentState && typeof componentState === 'object' && 'label' in componentState) {
        const div = document.createElement('div');
        div.innerHTML = `<h2>${(componentState as { label: string }).label}</h2>`;
        container.element.appendChild(div);
      } else {
        const div = document.createElement('div');
        div.innerHTML = `<h2>Default</h2>`;
        container.element.appendChild(div);
      }
    });

    

        this.myLayout.init();
        this.themeService.applyTheme(this.themeService.getCurrentTheme())
  }



  ngOnInit(): void {
    console.log("ngOnInit HomeComponent");
    
    const usersubsc = this.userStore.getUsername().subscribe(username => { 
      this.username = username;
      //this.loadLayoutSettings(); 
    });
    this.subscriptions.push(usersubsc)

  }
  
  ngOnDestroy(): void {
    if (environment) {
      console.log("ngOnDestroy HomeComponent");
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  // onDragEnd(event: SplitGutterInteractionEvent): void {
  //   this.firstAreaSize = this.extractSize(event.sizes[0]);
  //   this.secondAreaSize = this.extractSize(event.sizes[1]);
  //   this.saveLayoutSettings();
  // }

  // onVerticalDragEnd(event: SplitGutterInteractionEvent): void {
  //   this.firstVerticalAreaSize = this.extractSize(event.sizes[0]);
  //   this.secondVerticalAreaSize = this.extractSize(event.sizes[1]);
  //   this.saveLayoutSettings();
  // }

  // extractSize(areaSize: any): number {
  //   return typeof areaSize === 'string' ? parseFloat(areaSize) : areaSize;
  // }

  // toggleLock() {
  //   this.isLocked = !this.isLocked;
  //   this.saveLayoutSettings();
  // }

  // saveLayoutSettings(): void {
  //   const layoutSettings = {
  //     firstAreaSize: this.firstAreaSize,
  //     secondAreaSize: this.secondAreaSize,
  //     firstVerticalAreaSize: this.firstVerticalAreaSize,
  //     secondVerticalAreaSize: this.secondVerticalAreaSize,
  //     isLocked: this.isLocked
  //   };
  //   const saveSubscription = this.layoutService.saveLayoutSettings(this.username, layoutSettings).subscribe();
  //   this.subscriptions.push(saveSubscription);
  // }

  // loadLayoutSettings(): void {
  //   const layoutSettings = localStorage.getItem('layoutSettings');
  //   if (layoutSettings) {
  //     const parsedLayout = JSON.parse(layoutSettings); 
  //     this.firstAreaSize = parsedLayout.firstAreaSize;
  //     this.secondAreaSize = parsedLayout.secondAreaSize;
  //     this.firstVerticalAreaSize = parsedLayout.firstVerticalAreaSize;
  //     this.secondVerticalAreaSize = parsedLayout.secondVerticalAreaSize;
  //     this.isLocked = parsedLayout.isLocked;
  //   }
  // }
}

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DxSplitterModule,
    DxDataGridModule,
    StockQuotationModule,
    
  ]
})
export class HomeModule { }
