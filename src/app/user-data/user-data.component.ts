import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent {
  public user?: User
  constructor(private userService: UserService) { }

  /* ngOnInit() {
    this.getData()
  } */

  getData() {
    this.userService.getUserData()
      .subscribe((response) => {
        console.log(response)
        this.user = response
      })
  }
}
