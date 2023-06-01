import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthToken } from './auth-token';
import { HttpOptions } from './http-options';

@Injectable({
  providedIn: 'root'
})

// Provides functions related to user authentication
export class AuthService {
  private authUrl = env.baseUrl+'/auth'
  private httpOptions = new HttpOptions()
  private readonly DAYS = 1000 * 60 * 60 * 24
  private readonly EXP_TIME = 7 * this.DAYS
  public token: string = ''
  constructor(private http: HttpClient) { }

  // Requests and stores a token to the public API
  signIn(email: string, password: string): Observable<AuthToken> {
    const url = this.authUrl+'/sign-in'
    return this.http.post<AuthToken>(url, {
      email: email,
      password: password
    }, this.httpOptions)
      .pipe(
        tap(_ => {
          this.token =  _.token ? _.token : ''
          const lsToken: localStorageToken = {
            token: this.token,
            expirationDate: new Date(Date.now() + this.EXP_TIME)
          }
          try {
            localStorage.setItem('token', JSON.stringify(lsToken))
          } catch (error) {
            console.error('Error stringifying token: \n', lsToken, error)
          }
        }),
        catchError(this.handleError<AuthToken>())
      )
  }

  // Makes a request to create a new user
  signUp(username: string, email: string, password: string): Observable<authResponse> {
    const url = this.authUrl + '/sign-up'
    return this.http.post<authResponse>(url, {
      username: username,
      email: email,
      password: password
    }, this.httpOptions)
  }

  // Remove token
  signOut() {
    this.token = ''
    this.removeLocalStorageToken()
  }

  // Makes a request to change the current user's password
  changePassword(newPassword: string): Observable<authResponse> {
    const url = this.authUrl + '/change-password'
    const httpOptions = new HttpOptions('token='+this.token)
    return this.http.put<authResponse>(url, {
      password: newPassword
    }, httpOptions)
  }

  // Function to check if the user can access a given route
  canActivate(): boolean {
    return this.token !== '' || this.checkLocalStorageToken()
  }

  // Removes the token from localStorage
  removeLocalStorageToken() {
    if (localStorage.getItem('token'))
      localStorage.removeItem('token')
  }

  // Check and retrieve the token from localStorage
  checkLocalStorageToken() {
    const tokenStr = localStorage.getItem('token')
    if (!tokenStr)
      return false

    let lsToken: localStorageToken
    try {
      const tmpToken = JSON.parse(tokenStr)
      lsToken = {
        token: tmpToken.token,
        expirationDate: new Date(tmpToken.expirationDate)
      }
    } catch (error) {
      console.error('Error on AuthService constructor while parsing localStorage Token: \n', error)
      return false
    }
    if (lsToken.expirationDate.getTime() > Date.now() + this.EXP_TIME) {
      console.log('Token expired')
      localStorage.removeItem('token')
      return false
    }

    this.token = lsToken.token

    return true
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}

// Types for responses and tokens
type authResponse = {id: string, msg: string, error?: string}
type localStorageToken = {token: string, expirationDate: Date}
