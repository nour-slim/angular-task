import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  istext: boolean = false;
  eyeicon: string = 'fa fa-eye-slash';
  loginform!: FormGroup;
  
 
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService) {

  }




  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });  
  }

  showpass() {
    this.istext = !this.istext;
    this.istext ? this.eyeicon = 'fa fa-eye' : this.eyeicon = 'fa fa-eye-slash';
    this.istext ? this.type = 'text' : this.type = 'password';
   }


  onLogin() {
    if (this.loginform.valid) {
      this.auth.login(this.loginform.value)
      .subscribe({
        next: (res) => {
          this.loginform.reset();
         this.auth.storeToken(res.token);
         // let tokenpayload = this.auth.decodeToken();
         // this.userstore.setFullName(tokenpayload.name);
          this.toast.success("SUCCESS", res.message, 5000);      
          this.router.navigate(['home']);
        },
        error: (err) => {
          this.toast.warning("ERROR","Something went wrong!", 5000);         
        }
      });
    } else {
      ValidateForm.validatefields(this.loginform);
    }
  }

  
 

 

}
  