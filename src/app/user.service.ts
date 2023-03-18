import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthToken } from './auth-token';
import { AuthService } from './auth.service';
import { HttpOptions } from './http-options';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://localhost:8443/api/users'
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserData(): Observable<User> {
    const httpOptions = new HttpOptions('token='+this.authService.token)
    console.log(httpOptions)
    const url = this.userUrl + '/'
    return this.http.get<User>(url, httpOptions)
      .pipe(catchError(this.handleError<User>()))
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
