import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{
route=inject(ActivatedRoute)
  ngOnInit(): void {
this.route.queryParams.subscribe(params=>{
  this.emailid=params['emailid'];
  console.log(this.emailid)
})
this.expand=true;
  }
expand:boolean=false;
  emailid: string = '';
  password: string = '';
  username: string = '';
  authservice = inject(AuthService);
  router=inject(Router);
  emailExists: boolean = false;
  startSignup: boolean = false;
  // onSubmit() {
  //   console.log('emailcheck clicked');
  //   console.log(this.emailid);
  //   this.authservice.checkEmail(this.emailid).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.emailExists = true;
  //     },
  //     (error) => {
  //       this.emailExists = false;
  //       this.startSignup = true;
  //       console.log(error.message)
  //     }
  //   );
  // }

  // Login() {
  //   console.log('Login Clicked');
  //   console.log(this.emailid, this.password);
  //   this.authservice.login(this.emailid, this.password).subscribe(
  //     (res: any) => {
  //       console.log(res);
  //       this.emailid = '';
  //       this.password = '';
  //       this.router.navigate(['/dashboard'])
  //     },
  //     (err: any) => {
  //       console.log(err.message);
  //     }
  //   );
  // }


  signUp(){
    this.authservice.signUp(this.username,this.emailid, this.password).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/login']);
    }, err => {
      console.log(err.message);
    })

  }
}
