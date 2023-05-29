import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConversationService } from '../conversation.service';
import { UserService } from '../user.service';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser = faUser;
  faTrash = faTrash;
  public contact = this.userService.contact
  public user = this.userService.user
  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private router: Router,
    private location: Location
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

  getConversation() {
    return this.conversationService.conversation
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
    if (!confirm('Do you want to delete this conversation?'))
      return

    this.conversationService.delete(this.conversationService.conversation!)
      .subscribe(() => {
        this.conversationService.conversation = undefined
        window.location.reload()
      })
  }
}
