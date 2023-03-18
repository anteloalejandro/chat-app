import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthToken } from './auth-token';
import { HttpOptions } from './http-options';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:8443/auth'
  private httpOptions = new HttpOptions()
  public token: string = ''
  constructor(private http: HttpClient) { }

  signIn(email: string, password: string): Observable<AuthToken> {
    const url = this.authUrl+'/sign-in'
    return this.http.post<AuthToken>(url, {
      email: email,
      password: password
    }, this.httpOptions)
      .pipe(
        tap(_ => this.token = _.token),
        catchError(this.handleError<AuthToken>())
      )
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}