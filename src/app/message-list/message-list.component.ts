import { AfterContentChecked, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
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
  public user?: User
  private lastDate?: Date

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef

  ) {}

  ngOnInit() {
    this.user = this.userService.user
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
      const lastMsg = document.querySelector('.messageElmnt:last-of-type')
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
