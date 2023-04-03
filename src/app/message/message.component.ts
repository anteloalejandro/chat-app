import { Component, Input } from '@angular/core';
import { Message } from '../message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message!: Message
  @Input() isSent!: boolean


  dateToTimeStr() {
    const date = new Date(this.message.date)
    return date.toLocaleTimeString()
  }

}
