import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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
    private userService: UserService
  ) {}
  signIn(email: string, password: string) {
    this.authService.signIn(email, password)
      .subscribe(authToken => {
        console.log(authToken.token)
        console.log(this.authService.token)
        this.userService.getUser()
          .subscribe(user => this.user = user)
      })
  }
}
