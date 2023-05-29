import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { SocketIoService } from '../socket-io.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-send-bar',
  templateUrl: './send-bar.component.html',
  styleUrls: ['./send-bar.component.scss']
})
export class SendBarComponent {
  faPaperPlane = faPaperPlane
  @Input() conversation?: string

  constructor(
    private messageService: MessageService,
    private socketService: SocketIoService
  ) {}

  ngOnInit() {
  }

  sendMessage(content: string) {
    if (!this.conversation)
      return
    this.messageService.save({content: content, conversation: this.conversation})
      .subscribe(message => {
        this.socketService.send(message)
      })
  }

}
