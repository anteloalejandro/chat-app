import { AfterContentChecked, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { SocketIoService } from '../socket-io.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements AfterContentChecked {
  public messages: Message[] = []
  @Input() conversation?: string
  private lastDate?: Date

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
    private socketService: SocketIoService

  ) {}

  ngOnInit() {
    this.socketService.onRead()
      .subscribe(message => {
        for(const msg of this.messages) {
          if (msg._id == message._id) {
            msg.status = 'recieved'
            return
          }
        }
        console.log({
          status: 'failed',
          author: message.author,
          user: this.user()?._id
        })
      })
  }

  user() {
    return this.userService.user
  }

  // 'Expression has changed after it was checked' fix.
  // It's not needed in production
  ngAfterContentChecked() : void {
    this.changeDetector.detectChanges();
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

        this.messages.forEach(m => {
          if (m.status != 'deleted') {
            this.socketService.read(m)
          }
        })
        this.scrollToBottom()
      })
  }

  addMessage(message: Message) {
    if (message.conversation != this.conversation)
      return
    this.messages.push(message)
    this.scrollToBottom(true)
    this.socketService.read(message)
  }

  scrollToBottom(smooth = false) {
    if (this.messages.length == 0)
      return

    const options: ScrollIntoViewOptions =
      {behavior: smooth ? 'smooth' : 'auto'}

    var tmp = setInterval(() => {
      const lastMsg = document.querySelector('.message-container:last-of-type')
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
      console.log('no previous date, returning true');

      return true
    }

    const dayDiff = date.getDate() - this.lastDate.getDate()
    const monthDiff = date.getMonth() - this.lastDate.getMonth()
    const yearDiff = date.getFullYear() - this.lastDate.getFullYear()

    this.lastDate = date
    return dayDiff || monthDiff || yearDiff
  }
}
