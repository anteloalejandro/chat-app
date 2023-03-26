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
  contact = this.userService.contact
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
}
