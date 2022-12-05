import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  user: User;
  posts: Post[];
  isUserDataLoaded = false;
  isPostsLoaded = false;

  constructor(private activatedroute: ActivatedRoute,
    private notificationService: NotificationService,
    private imageService: ImageService,
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router) { }

  ngOnInit(): void {
    this.initUser();
    this.userService.getCurrentUser()
      .subscribe(data => {
        if (data.id == this.user.id) {
          this.router.navigate(['/profile']);
        }
        this.initPosts();
      });
  }

  likePost(postId: number, postIndex: number): void {
    this.postService.likePost(this.posts[postIndex].id!)
      .subscribe(() => {
        this.notificationService.showSnackBar('Like');
        window.location.reload();
      })
  }

  commentPost(message: string, postId: number, postIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.createComment(post.id!, message)
      .subscribe(data => {
        this.notificationService.showSnackBar('Comment writed');
        window.location.reload();
      });
  }

  initUser(): void {
    this.activatedroute.params.subscribe(data => {
      this.userService.getUserById(data.id)
        .subscribe(data => {
          this.user = data;
          this.imageService.getImageToCurrentUser()
            .subscribe(data => {
              try {
                this.user.image = data.imageBytes;
              } catch {
                this.notificationService.showSnackBar(data.message);
              }
            });
          this.isUserDataLoaded = true;
        });
    })
  }

  initPosts(): void {
    this.postService.getAllPostsForUserById(this.user.id)
      .subscribe(data => {
        this.posts = data;
        this.getImagesToPosts(this.posts);
        this.getImagesToUsers(this.posts);
        this.isPostsLoaded = true;
      });
  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.imageService.getImageToPost(p.id!)
        .subscribe(data => {
          p.image = data.imageBytes;
        })
    });
  }

  getImagesToUsers(posts: Post[]): void {
    posts.forEach(p => {
      const comments = p.comments;
      comments?.forEach(c => {
        this.imageService.getImageToUser(c.personDto.id)
          .subscribe(data => {
            c.personDto.image = data.imageBytes;
          })
      })
    });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }

}
