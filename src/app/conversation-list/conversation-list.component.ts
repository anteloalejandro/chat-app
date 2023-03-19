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
        conversations.forEach(c => {
          const id = this.userService.notMe(c.users.user1, c.users.user2)
          this.userService.getUser(id).subscribe(user => {
            this.contacts.push(user)
          })
        })
      })
  }
}
