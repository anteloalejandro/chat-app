import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private authService: AuthService) {}
  signIn(email: string, password: string) {
    this.authService.signIn(email, password)
      .subscribe(authToken => {
        console.log(authToken.token)
        console.log(this.authService.token)
      })
  }
}
