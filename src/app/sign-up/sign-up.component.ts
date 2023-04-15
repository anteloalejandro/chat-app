import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocketIoService } from '../socket-io.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  error?: string
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private socketService: SocketIoService,
    private router: Router
  ) {}

  signUp(username: string, email: string, password: string) {
    if (!(username || email || password))
      return

    this.authService.signUp(username, email, password)
      .subscribe(response => {
        if (response.error) {
          this.error = response.error
          return
        }

        this.authService.signIn(email, password)
          .subscribe(() => {
            this.userService.getUser()
              .subscribe(user => {
                this.socketService.joinRoom(user._id)
                this.router.navigate(['/'])
              })
          })
      })
  }
}
