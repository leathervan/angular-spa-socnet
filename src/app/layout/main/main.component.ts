import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts: Post[];
  currentUser: User;
  isPostsLoaded = false;
  isUserDataLoaded = false;

  constructor(private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.initPosts();
    this.initUser();
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

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }

  initPosts(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        this.posts = data;
        this.getImagesToPosts(this.posts);
        this.getImagesToUsers(this.posts);
        this.isPostsLoaded = true;
      });
  }

  initUser(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.currentUser = data;
        this.isUserDataLoaded = true;
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
}
