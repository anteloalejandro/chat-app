import { Component } from '@angular/core';
import { Conversation } from '../conversation';
import { ConversationService } from '../conversation.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  public conversations: Conversation[] = []
  public contacts: User[] = []

  constructor(
    private conversationService: ConversationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getConversations()
  }

  getConversations() {
    this.conversationService.getConversations()
      .subscribe(conversations => {
        this.conversations = conversations
        this.userService.getContacts()
          .subscribe(contacts => this.contacts = contacts)
      })
  }
}
