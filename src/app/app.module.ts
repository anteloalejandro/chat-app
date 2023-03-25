import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDataComponent } from './user-data/user-data.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './start/start.component';
import { HeaderComponent } from './header/header.component';
import { SendBarComponent } from './send-bar/send-bar.component';
import { ErrorComponent } from './error/error.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserDataComponent,
    ConversationListComponent,
    MessageListComponent,
    StartComponent,
    HeaderComponent,
    SendBarComponent,
    ErrorComponent,
    UserSearchComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
