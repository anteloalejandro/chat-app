import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpOptions } from './http-options';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messsageUrl = 'https://localhost:8443/api/messages'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getMessagesFromConversation(id: string): Observable<Message[]> {
    const url = this.messsageUrl+'/conversation/'+id
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.get<Message[]>(url, httpOptions)
  }
}
