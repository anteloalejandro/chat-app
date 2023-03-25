import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDataComponent } from './user-data/user-data.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { AuthService } from './auth.service';
import { StartComponent } from './start/start.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const canActivateAuth: CanActivateFn = () => {
  if (inject(AuthService).canActivate())
    return true

  inject(Router).navigate(['/sign-in'])
  return false
}

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'user-data/:id', component: UserDataComponent, canActivate: [canActivateAuth]},
  {path: '', component: StartComponent, canActivate: [canActivateAuth]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
