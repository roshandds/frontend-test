
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../chat.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat-ui',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './chat-ui.component.html',
  styleUrl: './chat-ui.component.css'
})
export class ChatUiComponent implements OnInit{
  fb=inject(FormBuilder)
  messageform:FormGroup =this.fb.group(
   { message:["",Validators.required]}
  )

  router=inject(Router)
  authservice=inject(AuthService)
  chatservice=inject(ChatService)
  acrouter=inject(ActivatedRoute)
  loggedinUser:any
  clickedUserId:any
  clickedUserData:any
  mergeId:string=''

  private socket = io('http://localhost:3000');

  goBack(){
    this.router.navigate(['dashboard']);
      }




      ngOnInit(): void {
        this.loggedinUser=localStorage.getItem('loggedinUser')
        this.loggedinUser=JSON.parse(this.loggedinUser)
        console.log(this.loggedinUser._id,"loggeduser")
        //get user by id

        this.acrouter.params.subscribe((params)=>{
          const frdid=params['_id']
          this.clickedUserId=frdid
          console.log(this.clickedUserId,"frdiddd")
          this.getUserById(this.clickedUserId)
          // this.sendMessage()
        })
        this.getAllMessages();

        // this.chatservice.getget()

        this.socket.on('getMessage', (msg:any) => {
          console.log('Received message:', msg);
        });
        // this.chatservice.getMessages()
        // this.getAllMessages()
      }



      

constructor(){

}



getUserById(id:any){
  this.authservice.getUserById(id).subscribe((res)=>{
    console.log(res,"getuserbyid")
    this.clickedUserData=res
    console.log(this.clickedUserData,"clickeduser")
  },(err)=>{
    console.log(err.message)
  })
}


sendMessage(){
console.log()

   this.mergeId= this.chatservice.mergetheId(this.loggedinUser._id,this.clickedUserId)
console.log(this.mergeId,"themergedid");
const messageData = {
  senderId: this.loggedinUser._id,
  receiverId: this.clickedUserId,
  mergeId: this.mergeId,
  message: this.messageform.value.message
};
console.log(messageData)
// Emit the message data to the server
this.chatservice.sendMessage(messageData)
// Clear the message input
}


getAllMessages() {
  this.mergeId= this.chatservice.mergetheId(this.loggedinUser._id,this.clickedUserId)
  this.chatservice.getAllMessages(this.mergeId);
}
}



