import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Conversation } from './conversation';
import { HttpOptions } from './http-options';

@Injectable({
  providedIn: 'root'
})

// Provides functions to handle conversations
export class ConversationService {
  private conversationUrl = env.baseUrl+'/api/conversations'
  public conversation?: string
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Makes a request to get all the conversations the user has
  getConversations(): Observable<Conversation[]> {
    const url = this.conversationUrl
    const httpOptions = new HttpOptions('token='+this.authService.token)
    return this.http.get<Conversation[]>(url, httpOptions)
  }

  // Makes a request to get all the conversations with unread messages the user has
  getUnreadConversations(): Observable<Conversation[]> {
    const url = this.conversationUrl + '/unread'
    const httpOptions = new HttpOptions('token='+this.authService.token)
    return this.http.get<Conversation[]>(url, httpOptions)
  }

  // Makes a request to create a new conversation
  new(recipient: string): Observable<Conversation> {
    const url = this.conversationUrl
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.post<Conversation>(url, {recipient}, httpOptions)
  }

  // Makes a request to remove a conversation
  delete(id: string): Observable<Conversation> {
    const url = this.conversationUrl + '/' + id
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.delete<Conversation>(url, httpOptions)
  }
}
