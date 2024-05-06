import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-ui',
  standalone: true,
  imports: [],
  templateUrl: './chat-ui.component.html',
  styleUrl: './chat-ui.component.css'
})
export class ChatUiComponent {
  router=inject(Router)
  goBack(){
    this.router.navigate(['dashboard']);
      }
}
