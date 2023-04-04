import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent {
  public user?: User
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id')
    this.getUser()
  }

  getUser() {
    this.user = this.userService.user
    return this.user
  }

  deleteAccount() {
    if (confirm('¿Are you sure you want to delete your account?'))
      this.userService.deleteUser().subscribe()
  }

  goBack() {
    this.location.back()
    this.userService.contact = undefined
  }

  getCurrentUser() {
    return this.userService.user
  }
}
