import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: any = {};
  formDisabled = true;
  changesMade = false;

  @Input()username!: string;
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private userStore: UserStoreService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userStore.getUsername()
    .subscribe(val=>{
      const UserNameFromToken = this.authService.getUsernameFromToken();
      this.username = val || UserNameFromToken
    });
    this.fetchProfileData();
  }
  fetchProfileData() {
    this.profileData = {
      firstName: 'Nour',
      lastName: 'Sleem',
      email: 'nour.slim@gmail.com',
      phone: '123-456-7890'
    };

    this.firstName = this.profileData.firstName;
    this.lastName = this.profileData.lastName;
    this.email = this.profileData.email;
  }

  onValueChanged() {
    this.changesMade = true;
    this.formDisabled = false;
  }

  saveProfile() {
      this.changesMade = false;
      this.formDisabled = true;
        notify({
          message: 'Info Saved',
          position: { at: 'top right', my: 'top right', offset: { x: 20, y: 20 } },
          type: 'success',
          width: 300,
          height: 70,
          displayTime: 3000,
          showCloseButton: true
        }, 'success');
  }

  cancelEdit() {
    this.changesMade = false;
    this.formDisabled = true;
  }

  handleError(err: any) {
    let errorMessage = 'An unexpected error occurred.';
    if (err.status === 400) {
      errorMessage = 'Bad Request: Please check your input.';
    } else if (err.status === 401) {
      errorMessage = 'Unauthorized: Invalid credentials.';
    }

    notify({
      message: errorMessage,
      position: { at: 'top right', my: 'top right', offset: { x: 20, y: 20 } },
      type: 'error',
      width: 300,
      height: 70,
      displayTime: 3000,
      showCloseButton: true
    }, 'error');

    console.error('Profile error:', err);
  }
}
