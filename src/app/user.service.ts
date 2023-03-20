import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, flatMap, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpOptions } from './http-options';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = env.baseUrl+'/api/users'
  public user?: User
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUser(id?: string): Observable<User> {
    let url = this.userUrl + '/'
    let params = 'token='+this.authService.token
    let store = true
    if (id) {
      url += id
      params = ''
      store = false
    }

    const httpOptions = new HttpOptions(params)
    return this.http.get<User>(url, httpOptions)
      .pipe(
        tap(_ => {
          if (!store)
            return
          this.user = _
        }),
        catchError(this.handleError<User>()))
  }

  getContacts(): Observable<User[]> {
    const url = this.userUrl + '/contacts'
    const httpOptions = new HttpOptions('token='+this.authService.token)
    return this.http.get<User[]>(url, httpOptions)
  }

  whoAmI(user1: string, user2: string): string {
    const me = this.user
    const alsoMe = me?._id == user1 ? user1 : user2
    return alsoMe
  }

  notMe(user1: string, user2: string): string {
    const me = this.user
    const notMe = me?._id != user1 ? user1 : user2
    return notMe
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
