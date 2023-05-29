import { Component, Input } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { faCheck, faCheckDouble, faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  faCheck = faCheck
  faCheckDouble = faCheckDouble
  faCaretDown = faCaretDown
  faXmark = faXmark
  @Input() message!: Message
  @Input() isSent!: boolean
  public showDropdown = false

  constructor(
    private messageService: MessageService
  ) {}

  dateToTimeStr() {
    const date = new Date(this.message.date)
    return date.toLocaleTimeString()
  }

  toggleDrodown() {
    this.showDropdown = !this.showDropdown
  }

  deleteMessage() {
    this.showDropdown = false
    this.messageService.delete(this.message._id)
      .subscribe(msg => {
        if (msg.error) return

        this.message.status = 'deleted'
      })
  }

}
