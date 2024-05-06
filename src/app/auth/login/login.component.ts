import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import Notiflix from 'notiflix'
import { ChatService } from '../../pages/chat.service';

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
  chatservice = inject(ChatService);
  router=inject(Router);
  emailExists: boolean = false;
  startSignup: boolean = false;
loggedinUser:any
usertoken:any;

ngOnInit(): void {
// if(this.usertoken.length<0){
//   console.log(this.usertoken,"usertoken")
//   this.router.navigate(['/login'])
// }else{
//   this.router.navigate(['/dashboard'])
// }
// setTimeout(() => {

// }, 3000);
// this.checkLocal();
// console.log(this.usertoken)
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
        this.chatservice.connection()
        this.chatservice.login(res.data._id)
        // console.log(res.data);
        // this.loggedinUser=res.data;
        // this.setCookie("loggedinUser",this.loggedinUser,1)
        Notiflix.Notify.success('Login successful')
        this.loggedinUser=JSON.stringify(res.data)
        localStorage.setItem('loggedinUser',this.loggedinUser);
        this.router.navigate(['/dashboard'])

        // console.log(this.loggedinUser._id)
        // console.log(res.data)

      },
      (err: any) => {
        console.log(err.message);
      Notiflix.Notify.failure('Login failed')

      }
    );
  }
  signup(){

  }
setCookie(cookieName: string, cookieValue: string, expireDays: number) {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + expireDays);

  const cookieString = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue) + ';expires=' + expireDate.toUTCString() + ';path=/';
  document.cookie = cookieString;
}

  gotoSignup(){
this.router.navigate(['signup'])
  }
}
