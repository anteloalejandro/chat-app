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
export class ConversationService {
  private conversationUrl = env.baseUrl+'/api/conversations'
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getConversations(): Observable<Conversation[]> {
    const url = this.conversationUrl
    const httpOptions = new HttpOptions('token='+this.authService.token)
    return this.http.get<Conversation[]>(url, httpOptions)
  }

  new(recipient: string): Observable<Conversation> {
    const url = this.conversationUrl
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.post<Conversation>(url, {recipient}, httpOptions)
  }
}
