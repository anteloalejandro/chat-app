import { Component, EventEmitter, Output } from '@angular/core';
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
  public selected?: string
  public conversations: Conversation[] = []
  public checkedConversations = false
  public contacts: User[] = []
  public conversationContactMap = new Map<string, string>()
  @Output() onSelectConversation = new EventEmitter<string>();

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
          .subscribe(contacts => {
            this.updateMap(contacts)
            this.contacts = contacts
            this.checkedConversations = true
          })
      })
  }

  updateMap(contacts: User[]) {
    for (const conv of this.conversations) {
      for (const contact of contacts) {
        if (contact.conversations.includes(conv._id)) {
          this.conversationContactMap.set(conv._id, contact.username)
          break
        }
      }
    }
  }

  selectConversation(id: string) {
    this.selected = id
    const contact = this.contacts.filter(c =>
        c.conversations.includes(id))[0]
    console.log(contact)
    this.userService.contact = contact
    console.log('sending conversation')
    this.onSelectConversation.emit(id)
  }
}
