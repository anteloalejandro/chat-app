import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../auth.service';
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
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    console.log(this.authService.token)
    this.userService.getUser().subscribe(user => {
      this.user = user
      this.userCopy = this.user
    })
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?'))
      this.userService.deleteUser()
      .subscribe( () => {
        this.authService.token = ''
        this.userService.user = undefined
        this.router.navigate(['/'])
      })
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
