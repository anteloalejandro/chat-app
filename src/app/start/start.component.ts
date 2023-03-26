import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../user.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  public conversation?: string
  public mobileLayout = false
  public mobileView: 'conversations' | 'messages' = 'conversations'

  public view = '/conversation-list'
  constructor(
    private responsive: BreakpointObserver,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const mobile = '(max-width: 600px)'
    this.responsive.observe(mobile)
      .subscribe(state => {
        this.mobileLayout = !!state.matches
      })
  }

  setConversation(id: string) {
    this.conversation = id
    console.log('conversation set to: '+this.conversation)
    if (this.mobileLayout)
      this.mobileView = 'messages'

    console.log(this.mobileView)
  }

  switchToConversations() {
    this.mobileView = 'conversations'
    this.userService.contact = undefined
  }
}
