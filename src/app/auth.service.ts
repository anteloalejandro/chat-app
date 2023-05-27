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
export class AuthService {
  private authUrl = env.baseUrl+'/auth'
  private httpOptions = new HttpOptions()
  private readonly DAYS = 1000 * 60 * 60 * 24
  private readonly EXP_TIME = 7 * this.DAYS
  public token: string = ''
  constructor(private http: HttpClient) { }

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

  signUp(username: string, email: string, password: string): Observable<authResponse> {
    const url = this.authUrl + '/sign-up'
    return this.http.post<authResponse>(url, {
      username: username,
      email: email,
      password: password
    }, this.httpOptions)
  }

  signOut() {
    this.token = ''
  }

  changePassword(newPassword: string): Observable<authResponse> {
    const url = this.authUrl + '/change-password'
    const httpOptions = new HttpOptions('token='+this.token)
    return this.http.put<authResponse>(url, {
      password: newPassword
    }, httpOptions)
  }

  canActivate(): boolean {
    return this.token !== ''
  }

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

type authResponse = {id: string, msg: string, error?: string}
type localStorageToken = {token: string, expirationDate: Date}
