import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, flatMap, mergeMap } from 'rxjs/operators';
import { AuthToken } from './auth-token';
import { AuthService } from './auth.service';
import { HttpOptions } from './http-options';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://localhost:8443/api/users'
  public user?: User
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserData(id?: string): Observable<User> {
    let url = this.userUrl + '/'
    let params = 'token='+this.authService.token
    let store = true
    if (id) {
      url += id
      params = ''
      store = false
    }

    const httpOptions = new HttpOptions(params)
    console.log(httpOptions)
    return this.http.get<User>(url, httpOptions)
      .pipe(
        tap(_ => {
          if (!store)
            return
          this.user = _
        }),
        catchError(this.handleError<User>()))
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
