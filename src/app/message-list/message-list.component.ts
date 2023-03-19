import { Component } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  public messages: Message[] = []
  public conversation?: string
  public user = this.userService.getUser()

  constructor(
    private messageService: MessageService,
    public userService: UserService
  ) {}

  getMessages(conversationId: string) {
    this.conversation = conversationId
    this.messageService.getMessagesFromConversation(conversationId)
      .subscribe(messages => this.messages = messages)
  }
}
