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
// Provides functions to send and recieve socket.io-client events
export class SocketIoService {
  private socketUrl = env.baseUrl
  private socket = io(this.socketUrl)
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  // Join a room
  private joinRoom(room: string) {
    this.socket.emit('join', room)
  }

  // Leave a room (TODO)
  private leaveRoom(room: string) {
    console.log('leave room '+ room +' or smth idk')
  }

  // Join the user's own room
  join() {
    if (this.authService.token)
      this.joinRoom(this.authService.token)
  }

  // Send a message event
  send(message: Message) {
    this.socket.emit('message', message)
  }

  // Send a read message event
  read(message: Message) {
    if (message.author != this.userService.user!._id)
      this.socket.emit('read', message)
  }

  // Send a new conversation event
  newConversation(recipientId: string) {
    this.socket.emit('conversation', recipientId)
  }

  // Recieve a message event
  onRefresh(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('refresh-messages', (data: Message) => {
        return observer.next(data)
      })
    })
  }

  // Recieve a read message event
  onRead(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('refresh-read', (data: Message) => {
        return observer.next(data)
      })
    })
  }

  // Recieve a new conversation event
  onConversation() {
    return new Observable<any>(observer => {
      this.socket.on('refresh-conversations', (data: any) => {
        return observer.next(data)
      })
    })
  }
}
