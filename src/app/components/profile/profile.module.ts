import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxFormModule, DxButtonModule, DxTextBoxModule } from 'devextreme-angular';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    DxFormModule,      
    DxButtonModule,
    DxTextBoxModule,
    
  ]
})
export class ProfileModule { }
