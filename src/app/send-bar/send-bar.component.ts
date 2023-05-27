import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'app-send-bar',
  templateUrl: './send-bar.component.html',
  styleUrls: ['./send-bar.component.scss']
})
export class SendBarComponent {

  @Input() conversation?: string
  @Output() onMessageRecieved = new EventEmitter<Message>()

  constructor(
    private messageService: MessageService,
    private socketService: SocketIoService
  ) {}

  ngOnInit() {
    this.socketService.onRefresh()
      .subscribe(message => {
        this.onMessageRecieved.emit(message)
      })
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
