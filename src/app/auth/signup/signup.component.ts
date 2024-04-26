import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  emailid: string = '';
  password: string = '';
  username: string = '';
  authservice = inject(AuthService);
  router=inject(Router);
  emailExists: boolean = false;
  startSignup: boolean = false;
  onSubmit() {
    console.log('emailcheck clicked');
    console.log(this.emailid);
    this.authservice.checkEmail(this.emailid).subscribe(
      (res) => {
        console.log(res);
        this.emailExists = true;
      },
      (error) => {
        this.emailExists = false;
        this.startSignup = true;
        console.log(error.message)
      }
    );
  }

  Login() {
    console.log('Login Clicked');
    console.log(this.emailid, this.password);
    this.authservice.login(this.emailid, this.password).subscribe(
      (res: any) => {
        console.log(res);
        this.emailid = '';
        this.password = '';
        this.router.navigate(['/dashboard'])
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }


  signUp(){

  }
}
