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
  private userCopy?: User
  public edit = false
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id')
    this.userCopy = this.getUser()
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

  toggleEdit() {
    this.edit = !this.edit
    if (this.edit)
      this.userCopy = Object.assign({}, this.user)
  }

  cancelEdit() {
    this.user = this.userCopy
    console.log('restoring user')
  }

  updateUser() {
    if (!this.user) return

    this.userService.updateUser(this.user)
      .subscribe(user => {
        if (user.error) return

        this.toggleEdit()
      })
  }

  changePasswd() {
    if (!this.user || !this.userCopy)
      return

    const confirmMsg = 'Save changes before changing your password?'
    console.log(this.user, this.userCopy)
    let hasChanged = false
    if (this.user.username !== this.userCopy.username)
      hasChanged = true
    if (this.user.email !== this.userCopy.email)
      hasChanged = true
    if (this.user.profilePicture !== this.userCopy.profilePicture)
      hasChanged = true

    if (hasChanged)
      if (confirm(confirmMsg))
        this.updateUser()

    this.cancelEdit()
    this.router.navigate(['change-password'])

  }
}
