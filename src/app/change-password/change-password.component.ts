import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  error?: string
  user?: User
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit(newPasswd: string, newPasswdAgain: string) {
    if (newPasswd !== newPasswdAgain) {
      this.error = 'The passwords don\'t match'
      return
    }

    this.authService.changePassword(newPasswd)
      .subscribe(response => {
        this.error = response.error

        if (!this.error) {
          this.authService.signOut()
          this.router.navigate([''])
        }
      })
  }
}
