import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  istext: boolean = false;
  eyeicon: string = 'fa fa-eye-slash';
  signupform!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService) {}

  ngOnInit(): void {
    this.signupform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showpass() {
    this.istext = !this.istext;
    this.istext ? (this.eyeicon = 'fa-eye') : (this.eyeicon = 'fa-eye-slash');
    this.istext ? (this.type = 'text') : (this.type = 'password');
  }

  onSignup() {
    if (this.signupform.valid) {
      // Sending to backend service
      this.auth.signUp(this.signupform.value).subscribe({
        next: (res => {
          this.toast.success("SUCCESS", res.message, 5000);  
          console.log(res.message);
          this.signupform.reset();
          this.router.navigate(['login']);
          alert(res.message)
        }),
        error: (err => {
          alert(err?.error.message)
        })
      });
    } 
    else { 
      ValidateForm.validatefields(this.signupform);
      this.toast.warning("Error", "Your Form is Invalid!", 5000);         
    }
  }
}
