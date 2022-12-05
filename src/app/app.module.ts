import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Materialmodule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProvider } from './helper/auth-interceptor.service';
import { authErrorInterceptorProvider } from './helper/error-interceptor.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MainComponent } from './layout/main/main.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { UserPostsComponent } from './layout/user-posts/user-posts.component';
import { EditUserComponent } from './layout/edit-user/edit-user.component';
import { AddPostComponent } from './layout/add-post/add-post.component';
import { UsersProfileComponent } from './layout/users-profile/users-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    MainComponent,
    ProfileComponent,
    UserPostsComponent,
    EditUserComponent,
    AddPostComponent,
    UsersProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Materialmodule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProvider, authErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
