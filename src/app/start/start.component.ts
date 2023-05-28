import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../user.service';
import { SocketIoService } from '../socket-io.service';
import { AuthService } from '../auth.service';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  public conversation?: string
  public unreadConversations: string[] = []
  public mobileLayout = false
  public pcLayout = false
  public layout: 'pc' | 'mobile' | 'default' = 'default'
  public mobileView: 'conversations' | 'messages' = 'conversations'

  public view = '/conversation-list'
  constructor(
    private responsive: BreakpointObserver,
    private userService: UserService,
    private socketService: SocketIoService,
    private authService: AuthService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    if (this.conversationService.conversation) {
      this.conversation = this.conversationService.conversation
      this.conversationService.conversation = undefined
    }

    this.getUserAndJoin()
    const mobile = '(max-width: 600px)'
    const pc = '(min-width: 1200px)'
    this.responsive.observe([mobile, pc])
      .subscribe(state => {
        this.mobileLayout = state.breakpoints[mobile]
        this.pcLayout = state.breakpoints[pc]
        if (this.mobileLayout) {
          this.layout = 'mobile'
          if (this.conversation)
            this.mobileView = 'messages'
        }
        else if (this.pcLayout)
          this.layout = 'pc'
        else
          this.layout = 'default'
      })

    this.socketService.onRefresh()
      .subscribe(message => {
        if (message.conversation != this.conversation)
          this.setUnread(message.conversation)
      })
  }

  ngOnDestroy() {
    this.conversationService.conversation = this.conversation
    this.socketService.leaveRoom('a')
  }

  setConversation(id: string) {
    this.conversation = id
    console.log('conversation set to: '+this.conversation)
    if (this.mobileLayout)
      this.mobileView = 'messages'

    this.removeUnread(id)
    console.log(this.mobileView)
  }

  removeUnread(conversation: string) {
    const idx = this.unreadConversations.findIndex(c => c == conversation)
    if (idx >= 0) {
      this.unreadConversations.splice(idx, 1)
    }
  }

  setUnread(conversation: string) {
    this.unreadConversations.push(conversation)
    this.unreadConversations = [...new Set(this.unreadConversations)]
  }

  switchToConversations() {
    this.conversation = undefined
    this.userService.contact = undefined
    this.mobileView = 'conversations'

    console.log(this.conversation)
  }

  getContact() {
    return this.userService.contact
  }

  getUserAndJoin() {
    if (this.userService.user) {
      this.socketService.join()
    } else if (this.authService.checkLocalStorageToken()) {
      this.userService.getUser()
        .subscribe(() => {
          this.socketService.join()
        })
    }
  }
}
