import { Component, Input } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  public messages: Message[] = []
  @Input() conversation?: string
  public user?: User
  private lastDate?: Date

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.user
  }

  ngOnChanges() {
    if (this.conversation) {
      this.getMessages(this.conversation)
    }
  }

  getMessages(conversationId: string) {
    this.conversation = conversationId
    this.messageService.getMessagesFromConversation(conversationId)
      .subscribe(messages => {
        this.messages = messages
        this.scrollToBottom()
      })
  }

  addMessage(message: Message) {
    if (message.conversation != this.conversation)
      return
    this.messages.push(message)
    this.scrollToBottom(true)
  }

  scrollToBottom(smooth = false) {
    if (this.messages.length == 0)
      return

    const options: ScrollIntoViewOptions =
      {behavior: smooth ? 'smooth' : 'auto'}

    var tmp = setInterval(() => {
      const lastMsg = document.querySelector('.message:last-of-type')
      if (lastMsg) {
        clearInterval(tmp)
        lastMsg.scrollIntoView(options)
      }
    })
  }

  dateToDateStr(message: Message) {
    const date = new Date(message.date)
    return date.toLocaleDateString()
  }

  dateToTimeStr(message: Message) {
    const date = new Date(message.date)
    return date.toLocaleTimeString()
  }

  isDifferentDate(message: Message) {
    const date = new Date(message.date)
    if (!this.lastDate) {
      this.lastDate = date
      return true
    }


    console.log(this.lastDate.toLocaleDateString(), date.toLocaleDateString())

    const dayDiff = date.getDate() - this.lastDate.getDate()
    const monthDiff = date.getMonth() - this.lastDate.getMonth()
    const yearDiff = date.getFullYear() - this.lastDate.getFullYear()

    this.lastDate = date
    return dayDiff || monthDiff || yearDiff
  }
}
