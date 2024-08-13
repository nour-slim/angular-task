import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import notify from 'devextreme/ui/notify';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  type: string = 'password';
  istext: boolean = false;
  eyeicon: string = 'fa fa-eye-slash';
  loginform!: FormGroup;
  private subscriptions: Subscription[] = [];
  loginenable: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService,
  ) {
    
    this.loginenable = environment.loginenable;
  }

  ngOnDestroy(): void {
    console.log("Destroying Login");
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    if (environment.production && !this.loginenable) {
      alert("The application is in production mode. Login is disabled.");
      // Optionally redirect to home or another page
      this.router.navigate(['/']);
    } else {
      this.loginform = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  showpass() {
    this.istext = !this.istext;
    this.eyeicon = this.istext ? 'fa fa-eye' : 'fa fa-eye-slash';
    this.type = this.istext ? 'text' : 'password';
  }

  onLogin() {
    if (environment.production && !this.loginenable) {
      // Prevent login functionality in production mode
      return;
    }

    if (this.loginform.valid) {
      const loginsubs = this.auth.login(this.loginform.value)
      .subscribe({
        next: (res) => {
          this.loginform.reset();
          this.auth.storeToken(res.token);
          let tokenpayload = this.auth.decodedToken();
          this.subscriptions.push(loginsubs);
          notify({ message: 'Login Success',position: { at: 'top right', my: 'top right',offset: { x: 20, y: 20 }},type: 'success',width: 300,height: 70,displayTime: 3000,  showCloseButton: true });      
          this.router.navigate(['home']);
        },
        error: (err) => {
          let errorMessage = 'An unexpected error occurred.';
          if (err.status === 400) {
            errorMessage = 'Bad Request: Please check your input.';
          } else if (err.status === 401) {
            errorMessage = 'Unauthorized: Invalid Username';
          }
          notify({
            message: errorMessage,
            position: { 
              at: 'top right', 
              my: 'top right',
              offset: { x: 20, y: 20 } 
            },
            type: 'error',  
            width: 300,
            height: 70,
            displayTime: 3000,
            showCloseButton: true
          }, 'error');
          console.error('Login error:', err);
        }
      });
    } else {
      ValidateForm.validatefields(this.loginform);
    }
  }
}
