import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Conversation } from '../conversation';
import { ConversationService } from '../conversation.service';
import { SocketIoService } from '../socket-io.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  faMagnifyingGlassPlus = faMagnifyingGlassPlus
  @Input() selected?: string
  @Input() unreadConversations: string[] = []
  @Output() initiallyUnread = new EventEmitter<string[]>()
  public showUserSearch = false
  public conversations: Conversation[] = []
  public checkedConversations = false
  public contacts: User[] = []
  public conversationContactMap = new Map<string, string>()
  @Output() onSelectConversation = new EventEmitter<string>();

  constructor(
    private conversationService: ConversationService,
    private userService: UserService,
    private socketService: SocketIoService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getConversations()

    this.socketService.onConversation()
      .subscribe(conversation => {
        console.log('updating conversations')
        this.getConversations()
      })
  }

  ngAfterContentChecked() : void {
    this.changeDetector.detectChanges();
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

    this.conversationService.getUnreadConversations()
      .subscribe(conversations => {
        this.initiallyUnread.emit(conversations.map(c => c._id))
      })
  }

  // Update the map of users and conversations
  updateMap(contacts: User[]) {
    for (const conv of this.conversations) {
      for (const contact of contacts) {
        if (contact.conversations.includes(conv._id)) {
          this.conversationContactMap.set(conv._id, contact.username)
          break
        }
      }
      if (!this.conversationContactMap.has(conv._id))
        this.conversationContactMap.set(conv._id, '[deleted account]')
    }
  }

  selectConversation(id: string) {
    this.selected = id
    const contact = this.contacts.filter(c =>
        c.conversations.includes(id))[0]
    console.log(contact)
    this.userService.contact = contact
    this.conversationService.conversation = id
    console.log('sending conversation')
    this.onSelectConversation.emit(id)
  }

  isUnread(id: string) {
    if (this.unreadConversations.find(c => c == id))
      return true

    return false
  }
}
