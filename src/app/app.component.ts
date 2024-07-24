import { Component, HostBinding } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ScreenService } from './services/screen.service';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "";

  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(
    private authService: AuthService, 
    private screen: ScreenService, 
    private router: Router,
    private themeService:ThemeService
  ) { }

  isAuthenticated() {
    return this.authService.isLoggedIn();
  }

  showNavbar = false;

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/login', '/signup', '/reset-password'].includes(this.router.url);
      }
    });

    this.themeService.applyTheme();
  }
}
