import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { isObservable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
authservice=inject(AuthService)
allusers:any;
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // this.authservice.get.subscribe(user=>{
  //   console.log(user)
  // })



  this.getAllUsers();

// socket.on('connection',()=>{

// })



}

getAllUsers(){
  this.authservice.getAllUsers().subscribe((res:any)=>{
    console.log(res.allusers)
     this.allusers=res.allusers
  },err=>{
     console.log(err.message)
  })
}

}
