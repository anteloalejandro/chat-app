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
  public pcLayout = false
  public layout: 'pc' | 'mobile' | 'default' = 'default'
  public mobileView: 'conversations' | 'messages' = 'conversations'

  public view = '/conversation-list'
  constructor(
    private responsive: BreakpointObserver,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const mobile = '(max-width: 600px)'
    const pc = '(min-width: 1200px)'
    this.responsive.observe([mobile, pc])
      .subscribe(state => {
        this.mobileLayout = state.breakpoints[mobile]
        this.pcLayout = state.breakpoints[pc]
        if (this.mobileLayout)
          this.layout = 'mobile'
        else if (this.pcLayout)
          this.layout = 'pc'
        else
          this.layout = 'default'
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

  getContact() {
    return this.userService.contact
  }
}
