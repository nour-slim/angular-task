import { Component, Input, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DxListModule, DxContextMenuModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  @Input() menuItems: any;
  @Input() menuMode!: string;
  @Input()username!: string;

  constructor(
    private userStore: UserStoreService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userStore.getUsername()
    .subscribe(val=>{
      const UserNameFromToken = this.authService.getUsernameFromToken();
      this.username = val || UserNameFromToken
    });
  }
}

@NgModule({
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent]
})
export class UserPanelModule { }
