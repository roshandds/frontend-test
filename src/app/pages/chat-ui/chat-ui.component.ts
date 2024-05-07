
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-ui',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-ui.component.html',
  styleUrl: './chat-ui.component.css'
})
export class ChatUiComponent implements OnInit{
  router=inject(Router)
  authservice=inject(AuthService)
  chatservice=inject(ChatService)
  acrouter=inject(ActivatedRoute)
  loggedinUser:any
  clickedUserId:any
  clickedUserData:any
message:string=''
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
          this.sendMessage()

        })



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
if(this.message.length<0){
  console.log("please enter text to send message ")
}else{
  const mergeid= this.chatservice.mergetheId(this.loggedinUser._id,this.clickedUserId)
console.log(mergeid,"themergedid");
const messageData = {
  mergeId: mergeid,
  senderId: this.loggedinUser._id,
  receiverId: this.clickedUserId,
  message: this.message
};

// Emit the message data to the server
this.chatservice.sendMessage(messageData)
// Clear the message input
this.message = '';
}

}


}
