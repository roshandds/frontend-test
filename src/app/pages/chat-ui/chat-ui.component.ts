
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../chat.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { io, Socket } from 'socket.io-client';

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
  messageData:{}={}
  // private socket = io('http://localhost:3000');

  goBack(){
    this.router.navigate(['dashboard']);
      }

      ngOnInit(): void {
        this.loggedinUser=localStorage.getItem('loggedinUser')
        this.loggedinUser=JSON.parse(this.loggedinUser)
        console.log(this.loggedinUser._id,"loggeduser")


        this.acrouter.params.subscribe((params)=>{
          const frdid=params['_id']
          this.clickedUserId=frdid
          console.log(this.clickedUserId,"frdiddd")
          this.getUserById(this.clickedUserId)


        })

        this.mergeId= this.chatservice.mergetheId(this.loggedinUser._id,this.clickedUserId)
        this.messageData = {
          senderId: this.loggedinUser._id,
          receiverId: this.clickedUserId,
          mergeId: this.mergeId,
          message: this.messageform.value.message
        };



this,this.chatservice.getMessage()


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

this.chatservice.sendMessage(messageData)
this.getAllMessages(this.messageData)


}


getAllMessages(data:any) {
  // console.log('getallmessagecalledfunc', data.mergeId)
  this.mergeId= this.chatservice.mergetheId(this.loggedinUser._id,this.clickedUserId)
 const allmsg= this.chatservice.getAllMessages(data).subscribe((res)=>{
console.log(res,'msgres')
 },(err:any)=>{
  console.log(err)
  console.log(err.message)
 })
 console.log(allmsg,'allmessage')
}
}


