import { Component, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-pfp',
  templateUrl: './pfp.component.html',
  styleUrls: ['./pfp.component.scss']
})
export class PfpComponent {
  @Input() user?: User

  pfpUrl() {
    const profilePicture = this.user!.profilePicture!
    if (/^https?:\/\//.test(profilePicture))
      return profilePicture

    return '/public/img/uploads/' + profilePicture
  }
}
