import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocketIoService } from '../socket-io.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  error?: string
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private socketService: SocketIoService,
    private router: Router
  ) {
    if (this.authService.checkLocalStorageToken()) {
      this.getUser()
    }
  }

  signIn(email: string, password: string) {
    if (!(email || password))
      return

    this.authService.signIn(email, password)
      .subscribe(authToken => {
        if (authToken.error) {
          this.error = authToken.error
          return
        }

        console.log(authToken.token)
        console.log(this.authService.token)
        this.getUser()
      })
  }

  getUser() {
    this.userService.getUser()
      .subscribe(user => {
        this.router.navigate(['/'])
      })
  }

}
