import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:3000');
  mergeid:any
connection(){
  this.socket.on('connection',()=>{
    console.log(`socket it connected ${this.socket}`)
  })
}
 getMessages(): void {
  this.socket.on('getMessage', (message: any) => {
    console.log('Received message:', message);
    // Handle the received message, e.g., update UI
  });
}
getAllMessages(mergeId: string) {
  this.socket.emit('get-all-messages', { mergeId });
}


login(userId: string) {
  // Assuming you have the user ID available, emit the 'login' event with the user ID
  this.socket.emit('login', { id: userId });
}
message(){
  this.socket.emit('login',()=>{
    console.log('socket user logged in')
  })
}
  // sendMessage(message: string): void {
  //   this.socket.emit('message', message);
  // }
  // getMessages(): Observable<string> {
  //   return new Observable((observer) => {
  //     this.socket.on('message', (message) => {
  //       observer.next(message);
  //     });
  //   });
  // }




  mergetheId(senderid: string, receiverid: string): string {
    this.mergeid = [senderid, receiverid];
    this.mergeid.sort();
    const mergedId = this.mergeid.join('');
    console.log(mergedId, 'mergedid');
    return mergedId;
  }

  sendMessage(data: any) {
    console.log("sendmessagefunctioncalled", data);
    // const metadata = {
    //   senderId: "662a30412dda142dd3334358",
    //   receiverId: "663202ac8a580d4b1b7c40d7",
    //   mergeId: this.mergeid,
    //   message: data
    // };
    this.socket.emit('message', data); 

   
  }


  getAllChats(){
    console.log("getallfunctioniscalled")
    this.socket.on('getMessage', (msg) => {
      console.log('Received message:', msg);
      // Handle the received message, e.g., update UI
    });



  }


}
