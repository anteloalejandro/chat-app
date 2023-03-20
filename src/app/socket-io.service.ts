import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socketUrl = 'https://localhost:8443/'
  private socket = io(this.socketUrl)
  constructor(
  ) { }

  joinRoom(room: string) {
    this.socket.emit('join', room)

    this.socket.on('refresh-messages', msg => {
      console.log(msg)
    })
  }

  sendMessage(message: string) {
    this.socket.emit('message', message)
  }
}
