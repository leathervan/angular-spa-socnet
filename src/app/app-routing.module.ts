import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService } from './helper/auth-guard.service';
import { AddPostComponent } from './layout/add-post/add-post.component';
import { MainComponent } from './layout/main/main.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { UserPostsComponent } from './layout/user-posts/user-posts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuardService] },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
      { path: '', component: UserPostsComponent, canActivate: [AuthGuardService] },
      { path: 'add', component: AddPostComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
