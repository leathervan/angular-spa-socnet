import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ImageService } from 'src/app/services/image.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  isImageLoaded = false;
  user: User;

  constructor(private tokenService: TokenStorageService,
    private userService: UserService,
    private imageService: ImageService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if(this.isLoggedIn){
      this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.imageService.getImageToCurrentUser()
        .subscribe(data => {
          try {
            this.user.image = data.imageBytes;
            this.isImageLoaded = true;
          } catch {
            this.notificationService.showSnackBar(data.message);
          }
        });
        this.isDataLoaded = true;
      });
    }
  }

  logout(): void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }

}
