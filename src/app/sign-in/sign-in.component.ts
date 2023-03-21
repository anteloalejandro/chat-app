import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocketIoService } from '../socket-io.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  user?: User
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private socketService: SocketIoService,
    private router: Router
  ) {}
  signIn(email: string, password: string) {
    this.authService.signIn(email, password)
      .subscribe(authToken => {
        console.log(authToken.token)
        console.log(this.authService.token)
        this.userService.getUser()
          .subscribe(user => {
            this.user = user
            this.socketService.joinRoom(user._id)
            this.router.navigate(['/'])
          })
      })
  }
}
