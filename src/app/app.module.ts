import { NgModule } from '@angular/core';
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
import { HomeComponent } from './components/home/home.component';
import { DxListModule, DxButtonModule } from 'devextreme-angular';
import { SideNavOuterToolbarModule } from './layouts/side-nav-outer-toolbar/side-nav-outer-toolbar.component';
import { FooterModule } from './components/footer/footer.component';
import { ScreenService } from './services/screen.service';
import { ThemeSelectorModule } from './components/theme-selector/theme-selector.component';
import { DxTextBoxModule } from 'devextreme-angular';
import { ThemeService } from './services/theme.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ResetPasswordComponent,
   
    
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
    DxAccordionModule,DxSliderModule,
    HeaderModule,
    SideNavOuterToolbarModule,
    FooterModule,ThemeSelectorModule
    ,    DxTextBoxModule,

  
  ],

  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    AuthService, ScreenService, ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
