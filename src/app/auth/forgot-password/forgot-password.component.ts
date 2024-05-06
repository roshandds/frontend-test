import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
router=inject(Router)
emailid:string=''

gotoLogin(){
  this.router.navigate(['login'])
}


forgotPassword(){
if(this.emailid.length<0){
console.error("please enter valid email")
}else{console.log(this.emailid)}

}
}
