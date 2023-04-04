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
export class MessageService {
  private messsageUrl = env.baseUrl+'/api/messages'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getMessagesFromConversation(id: string): Observable<Message[]> {
    const url = this.messsageUrl+'/conversation/'+id
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.get<Message[]>(url, httpOptions)
  }


  save(message: messagePost): Observable<Message> {
    const url = this.messsageUrl
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.post<Message>(url, message, httpOptions)
  }

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
