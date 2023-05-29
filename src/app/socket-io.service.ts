import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client'
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Conversation } from './conversation';
import { Message } from './message';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socketUrl = env.baseUrl
  private socket = io(this.socketUrl)
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  join() {
    if (this.authService.token)
      this.joinRoom(this.authService.token)
  }

  joinRoom(room: string) {
    this.socket.emit('join', room)
  }

  leaveRoom(room: string) {
    console.log('leave room '+ room +' or smth idk')
  }

  send(message: Message) {
    this.socket.emit('message', message)
  }

  read(message: Message) {
    if (message.author != this.userService.user!._id)
      this.socket.emit('read', message)
  }

  newConversation(recipientId: string) {
    this.socket.emit('conversation', recipientId)
  }

  onRefresh(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('refresh-messages', (data: Message) => {
        return observer.next(data)
      })
    })
  }

  onRead(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('refresh-read', (data: Message) => {
        return observer.next(data)
      })
    })
  }

  onConversation() {
    return new Observable<any>(observer => {
      this.socket.on('refresh-conversations', (data: any) => {
        return observer.next(data)
      })
    })
  }
}
