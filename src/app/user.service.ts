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

// Provides functions to handle users
export class UserService {
  private userUrl = env.baseUrl+'/api/users'
  public user?: User
  public contact?: User
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    if (this.authService.token)
      this.getUser().subscribe()
  }

  // Makes a request to get a user
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

  // Makes a request to get a user by its email (perfect match)
  getByEmail(email: string): Observable<User> {
    const url = this.userUrl + '/byEmail/' + email
    const httpOptions = new HttpOptions()

    return this.http.get<User>(url, httpOptions)
  }

  // Makes a request to get a list of user by their email (partial match)
  search(email: string): Observable<User[]> {
    const url = this.userUrl + '/search'
    const httpOptions = new HttpOptions('email='+email)

    return this.http.get<User[]>(url, httpOptions)
  }

  // Makes a request to get a list of users the current one has conversations with
  getContacts(): Observable<User[]> {
    const url = this.userUrl + '/contacts'
    const httpOptions = new HttpOptions('token='+this.authService.token)
    return this.http.get<User[]>(url, httpOptions)
  }

  // Makes a request to delete a user
  deleteUser(): Observable<User> {
    const url = this.userUrl
    const httpOptions = new HttpOptions('token='+this.authService.token)
    return this.http.delete<User>(url, httpOptions)
  }

  // Makes a request to update a user
  updateUser(user: User): Observable<User> {
    const url = this.userUrl
    const httpOptions = new HttpOptions('token='+this.authService.token)

    return this.http.put<User>(url, user, httpOptions)
      .pipe(tap(_ => this.user = _))
  }

  // Between to users, who is the current user?
  whoAmI(user1: string, user2: string): string {
    const me = this.user
    const alsoMe = me?._id == user1 ? user1 : user2
    return alsoMe
  }

  // Between to users, who is NOT the current user?
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
