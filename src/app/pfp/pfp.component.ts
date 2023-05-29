import { Component, Input } from '@angular/core';
import { User } from '../user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pfp',
  templateUrl: './pfp.component.html',
  styleUrls: ['./pfp.component.scss']
})


export class PfpComponent {
  @Input() user?: User
  public showLetter = false
  baseUrl = environment.baseUrl

  ngOnChanges() {
    setTimeout(() => {this.showLetter = false}, 500)
  }

  pfpUrl() {
    const profilePicture = this.user!.profilePicture!
    if (/^https?:\/\//.test(profilePicture))
      return profilePicture

    return this.baseUrl+'/public/img/uploads/' + profilePicture
  }
}
