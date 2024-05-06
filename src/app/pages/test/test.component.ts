import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NgClass],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  isLightTheme:boolean=true;
  router=inject(Router)
  userList=['roshan','kaushal']
  // selectedUser=[message:"hellow","message":"hellow", ]
selecteduser=false;
  selectUser(user:any){
return false
  }
  goBack(){
this.router.navigate(['dashboard']);
  }
}
