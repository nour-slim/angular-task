// src/app/app.component.ts
import {  HostBinding, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ScreenService } from './services/screen.service';
import { Router, NavigationEnd } from '@angular/router';
import { ConfigService } from './services/config.service';
import { Component } from "@angular/core";
import { ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title?:string;
  showNavbar = false;
 
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(
    private authService: AuthService,
    private screen: ScreenService,
    private router: Router,
    private configService: ConfigService,
    private themeService: ThemeService,

  ) { 
    themeService.setAppTheme();

  }

  isAuthenticated() {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
    
    this.configService.load().then(config => {
      this.title = config.title;
      console.log('App title:', this.title);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/login', '/signup', '/reset-password'].includes(this.router.url);
      }
    });
  }
  
}
