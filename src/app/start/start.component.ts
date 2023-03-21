import { Component } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  public conversation?: string

  setConversation(id: string) {
    this.conversation = id
    console.log('conversation set to: '+this.conversation)
  }
}
