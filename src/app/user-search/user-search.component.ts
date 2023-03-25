import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent {
  private searchTerms = new Subject<string>()
  public users$!: Observable<User[]>
  public users: User[] = []

  constructor(
    private userService: UserService
  ) {}

  search(term: string) {
    this.searchTerms.next(term)
  }

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.search(term))
    )
      .subscribe(users => this.users = users.filter(u => u != this.userService.user))
  }
}
