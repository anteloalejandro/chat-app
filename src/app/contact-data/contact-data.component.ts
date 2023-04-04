import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent {
  @Input() user?: User
  public showNewConvBtn = false
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id')
    this.getData(idParam ? idParam : undefined)
  }

  getData(id?: string) {
    if (!id) {
      if (this.user)
        return
      this.user = this.userService.user
      return
    } else if (id == this.userService.contact?._id) {
      this.user = this.userService.contact
    } else {
      this.userService.getUser(id)
        .subscribe(user => this.user = user)
    }
    this.userService.getContacts()
      .subscribe(contacts => {
        const contactIds = contacts.map(c => c._id)
        this.showNewConvBtn = !contactIds.includes(id)
      })
  }

  newConversation() {
    if (!this.user || this.user == this.userService.user)
      return

    this.conversationService.new(this.user._id)
      .subscribe(conversation => {
        if (conversation.error)
          console.error(
            'error: '+conversation.error,
            'current user:'+this.userService.user?.username
          )
        else
          this.goBack()
      })
    //this.goBack()
  }

  deleteConversation() {
    alert('not implemented yet')
  }

  deleteContact() {
    if (confirm('¿Are you sure you want to delete your account?'))
      this.userService.deleteUser().subscribe()
  }

  goBack() {
    this.location.back()
    this.userService.contact = undefined
  }

  isOnStart() {
    return this.router.url == '/'
  }

  getCurrentUser() {
    return this.userService.user
  }
}