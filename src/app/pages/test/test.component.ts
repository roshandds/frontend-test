import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NgClass],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  isLightTheme:boolean=true;
  userList=['roshan','kaushal']
  // selectedUser=[message:"hellow","message":"hellow", ]
selecteduser=false;
  selectUser(user:any){
return false
  }
}
