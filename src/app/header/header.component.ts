import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { UserService } from '../user.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser = faUser;
  public contact = this.userService.contact
  public user = this.userService.user
  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private router: Router
  ) {}

  isOnStart() {
    return this.router.url == '/'
  }

  getContact() {
    this.contact = this.userService.contact
    return this.userService.contact
  }

  getUser() {
    this.user = this.userService.user
    return this.userService.user
  }

  username() {
    const maxChars = 8
    let username = this.contact?.username
    if (!username)
      return username

    if (username.length >= maxChars)
      username = username.slice(0, maxChars - 3) + '...'

    return username
  }

  deleteConv() {
    const contConvs = this.contact?.conversations
    const userConvs = this.user?.conversations

    const conversationId = contConvs!.find(c => {
      userConvs?.includes(c)
    })

    this.conversationService.delete(conversationId!)
      .subscribe()
  }
}
