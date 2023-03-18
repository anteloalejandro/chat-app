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
  private httpOptions = new HttpOptions()
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserData(): Observable<User> {
    // const url = 'https://localhost:8443/api/users/?token=627db4ee0a6dbb6177b5e6eb509e4f0906b5e1a98b7067f1cbd5e7544d1a763772bb43da28fdff3372e1c5520a2d2600bc779fe8cb50a6a36efd3e269c9fbc05c347fe2a75385dc0d14322e6c374c245c7caf0aa061c2166e1d05e07533f4fda'
    const url = this.userUrl + '/?token='+this.authService.token
    return this.http.get<User>(url, this.httpOptions)
      .pipe(catchError(this.handleError<User>()))
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
