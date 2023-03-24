import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.getData(id ? id : undefined)
  }

  getData(id?: string) {
    if (!id) {
      this.user = this.userService.user
    } else if (id == this.userService.contact?._id) {
      this.user = this.userService.contact
    } else {
      this.userService.getUser(id)
        .subscribe(user => this.user = user)
    }
  }

  goBack() {
    this.location.back()
    this.userService.contact = undefined
  }
}
