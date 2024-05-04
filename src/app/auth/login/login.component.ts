import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import Notiflix, {Notify} from 'notiflix'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,NgStyle,FormsModule,ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  emailid: string = '';
  password: string = '';
  username: string = '';
  authservice = inject(AuthService);
  router=inject(Router);
  emailExists: boolean = false;
  startSignup: boolean = false;

usertoken:any;
  ngOnInit(): void {
// if(this.usertoken.length<0){
//   console.log(this.usertoken,"usertoken")
//   this.router.navigate(['/login'])
// }else{
//   this.router.navigate(['/dashboard'])
// }
setTimeout(() => {

}, 3000);
// this.checkLocal();
console.log(this.usertoken)
  }


checkLocal(){
  this.usertoken=localStorage.getItem('user-token');
  if(this.usertoken?.length<0){
    this.router.navigate(['login'])
  }else{
    this.router.navigate(['dashboard']);
  }
  return this.usertoken;
}



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

        this.router.navigate(['/signup'],{queryParams:{emailid:this.emailid}})
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
        console.log(res);
      Notiflix.Notify.success('Login successful')

        localStorage.setItem('user-token', res.token);
        this.router.navigate(['/dashboard'])
      },
      (err: any) => {
        console.log(err.message);
      Notiflix.Notify.failure('Login failed')

      }
    );
  }
  signup(){

  }


  gotoSignup(){
this.router.navigate(['signup'])
  }
}
