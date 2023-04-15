import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client'
import { environment as env } from 'src/environments/environment';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socketUrl = env.baseUrl
  private socket = io(this.socketUrl)
  constructor(
  ) { }

  joinRoom(room: string) {
    this.socket.emit('join', room)
  }

  leaveRoom(room: string) {
    console.log('leave room '+ room +' or smth idk')
  }

  send(message: Message) {
    this.socket.emit('message', message)
  }

  onRefresh(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('refresh-messages', (data: Message) => {
        return observer.next(data)
      })
    })
  }
}
