import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket = io()
  constructor(
  ) { }

  joinRoom(room: string) {
    this.socket.emit('join', room)

    this.socket.on('refresh-messages', msg => {
      console.log(msg)
    })
  }
}
