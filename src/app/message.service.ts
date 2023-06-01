import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpOptions } from './http-options';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})

// Provides functions to handle messages
export class MessageService {
  private messsageUrl = env.baseUrl+'/api/messages'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Makes a request to obtain a single message
  getMessage(id: string): Observable<Message> {
    const url = this.messsageUrl + '/' + id
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.get<Message>(url, httpOptions)
  }

  // Makes a request to get all the messages pertaining to a conversation
  getMessagesFromConversation(id: string): Observable<Message[]> {
    const url = this.messsageUrl+'/conversation/'+id
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.get<Message[]>(url, httpOptions)
  }

  // Makes a request to store a message
  save(message: messagePost): Observable<Message> {
    const url = this.messsageUrl
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.post<Message>(url, message, httpOptions)
  }

  // Makes a request to delete a message
  delete(id: string): Observable<Message> {
    const url = this.messsageUrl + '/' + id
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.delete<Message>(url, httpOptions)
  }
}

type messagePost = {
  content: string,
  conversation: string
}
