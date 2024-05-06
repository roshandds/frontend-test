import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:3000');

connection(){
  this.socket.on('connection',()=>{
    console.log(`socket it connected ${this.socket}`)
  })
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
}
