import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
authservice=inject(AuthService)
router=inject(Router)
allusers:any;
nouserSelected:boolean=false;
user:any
loggedinUser:any
ngOnInit(): void {


  this.getCurrentUser();
  this.getAllUsers();





}

getAllUsers(){
  this.authservice.getAllUsers().subscribe((res:any)=>{
    console.log(res.allusers)
     this.allusers=res.allusers
     console.log(this.allusers)
  },err=>{
     console.log(err.message)
  })
}
getCurrentUser(){
  this.user=localStorage.getItem('loggedinUser')
  this.loggedinUser=JSON.parse(this.user)
  this.loggedinUser=this.loggedinUser._id
  console.log(this.loggedinUser)
}



chat(user:any){
  console.log(user._id)

this.router.navigate(['chats',user._id]);
}





toggleTheme(){
  console.log('HEwllo')
  const currentTheme=this.authservice.getcurrentTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.authservice.setCurrentTheme(newTheme);
}

}
