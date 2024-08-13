import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { UserStoreService } from '../../services/user-store.service';
import { ThemeSwitcherModule } from '../theme-switcher/theme-switcher.component';
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
    ThemeSwitcherModule
    
],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
