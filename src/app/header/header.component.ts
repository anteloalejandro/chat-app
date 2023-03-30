import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public contact = this.userService.contact
  public user = this.userService.user
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  isOnStart() {
    return this.router.url == '/'
  }

  getContact() {
    this.contact = this.userService.contact
    return this.userService.contact
  }

  getUser() {
    this.user = this.userService.user
    return this.userService.user
  }
}
