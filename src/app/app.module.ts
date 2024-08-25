import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HeaderModule } from './components/header/header.component';
import { NgToastModule } from 'ng-angular-popup';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { DxToolbarModule, DxDrawerModule, DxAccordionModule, DxSliderModule } from 'devextreme-angular';
import { HomeModule } from './components/home/home.component';
import { DxListModule, DxButtonModule } from 'devextreme-angular';
import { SideNavOuterToolbarModule } from './layouts/side-nav-outer-toolbar/side-nav-outer-toolbar.component';
import { FooterModule } from './components/footer/footer.component';
import { ScreenService } from './services/screen.service';
import { DxTextBoxModule } from 'devextreme-angular';
import {  UserPanelModule } from './components/user-panel/user-panel.component';
import { DxContextMenuModule } from 'devextreme-angular';
import {  APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './services/config.service';
import { ProfileModule } from './components/profile/profile.module';
import { DxDataGridModule } from 'devextreme-angular';
import { ThemeService } from './services/theme.service';
import { StockQuotationModule} from './components/stock-quotation/stock-quotation.component';
import { SignalRService } from './services/signalR/signal-r.service';
import { DxPopupModule } from 'devextreme-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { HubStatusComponent } from './components/hub-status/hub-status.component';


export function setupAppConfigServiceFactory(
  service: ConfigService
): Function {
  return () => service.load();
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
  // StockQuotationComponent,
  //HubStatusComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    DxDrawerModule,
    DxToolbarModule,
    DxButtonModule,
    DxListModule,
    DxAccordionModule,
    DxSliderModule,
    HeaderModule,
    SideNavOuterToolbarModule,
    FooterModule,
    DxTextBoxModule,
    DxContextMenuModule,
    UserPanelModule,
    HomeModule,
    ProfileModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    StockQuotationModule,
    
  ],

  providers: [{
    provide: APP_INITIALIZER,
    useFactory: setupAppConfigServiceFactory,
    deps: [
        ConfigService
    ],
    multi: true
},
    provideHttpClient(withInterceptorsFromDi()),
    AuthService, ScreenService, ThemeService, SignalRService, provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
