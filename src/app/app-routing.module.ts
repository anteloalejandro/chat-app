import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './auth.service';
import { StartComponent } from './start/start.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactDataComponent } from './contact-data/contact-data.component';
import { UserDataComponent } from './user-data/user-data.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const canActivateAuth: CanActivateFn = () => {
  if (inject(AuthService).canActivate())
    return true

  inject(Router).navigate(['/sign-in'])
  return false
}

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'contact-data/:id', component: ContactDataComponent, canActivate: [canActivateAuth]},
  {path: 'user-data', component: UserDataComponent, canActivate: [canActivateAuth]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [canActivateAuth]},
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
