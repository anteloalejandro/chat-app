import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MessageComponent } from './message/message.component';
import { ContactDataComponent } from './contact-data/contact-data.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PfpComponent } from './pfp/pfp.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    SignUpComponent,
    MessageComponent,
    ContactDataComponent,
    ChangePasswordComponent,
    PfpComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
