import { Component, NgModule, Input, Output, EventEmitter, OnInit , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { UserStoreService } from '../../services/user-store.service';
import { ThemeSwitcherModule } from '../theme-switcher/theme-switcher.component';
import { HubStatusComponent } from '../hub-status/hub-status.component';
import { DxPopupModule } from 'devextreme-angular';
import { HomeModule } from '../home/home.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {

  @Output() menuToggle = new EventEmitter<boolean>();
  @Input() menuToggleEnabled = false;
  @Input() title!: string;
  public username!:string;
  isPopupVisible: boolean = false;
  constructor(private authService: AuthService, private router: Router, private userStore: UserStoreService) {}

  ngOnInit() {
    this.userStore.getUsername()
    .subscribe(val=>{
      const UserNameFromToken = this.authService.getUsernameFromToken();
      this.username = val || UserNameFromToken
    });
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  menuToggleEnabledd = true;

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible; 
  }

  userMenuItems = [
    {
      text: 'Profile',
      icon: 'user',
      onClick: () => {
        this.router.navigate(['/profile']);
      }
    },
    {
      text: 'Logout',
      icon: 'runner',
      onClick: () => {
        this.authService.logOut();
      }
    }

  ];

  
  
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxToolbarModule,
    UserPanelModule,
    ThemeSwitcherModule,
    DxPopupModule,
    DxPopupModule,
    
],
  declarations: [HeaderComponent,HubStatusComponent],
  exports: [HeaderComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderModule { }
