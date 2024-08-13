import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResetPasswordService } from '../../services/reset-password.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public resetPasswordEmail: string="";
  


  constructor(private resetService: ResetPasswordService, private router: Router, private toast: NgToastService){}

  checkValidEmail(email: string): boolean {
    const value = email;
    const emailRegex = /^[\w-\-]+@([\w-]+\.)+[\w-]{2,3}$/;
    return emailRegex.test(value);
  }


  

  confirmToSend(form: NgForm) {
    if (form.valid) {
      console.log(this.resetPasswordEmail);
      
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res)=>{
          this.resetPasswordEmail = '';
          this.router.navigate(['login']);
          this.toast.success("Success", "Password was reset sucessfully!");

        },
        error:(err)=>{
          this.toast.warning("Error", "Failed to reset the password!");
        }
      })
    }
    }
  }
