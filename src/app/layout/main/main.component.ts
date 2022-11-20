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
  user: User;
  isPostsLoaded = false;
  isUserDataLoaded = false;

  constructor(private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        this.posts = data;
        this.getCommentsToPosts(this.posts);
        this.getImagesToPosts(this.posts);
        this.isPostsLoaded = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
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

  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getCommentsToPost(p.id!)
        .subscribe(data => {
          p.comments = data;
        })
    });
  }

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];

    if (!post.userLiked!.includes(this.user.username)) {
      this.postService.likePost(post.id!, this.user.username)
        .subscribe(() => {
          post.userLiked!.push(this.user.username);
          this.notificationService.showSnackBar('Liked ;)');
          window.location.reload();
        });
    } else {
      this.postService.likePost(post.id!, this.user.username)
        .subscribe(() => {
          const index = post.userLiked!.indexOf(this.user.username, 0);
          post.userLiked!.splice(index, 1);
          this.notificationService.showSnackBar('Like removed ;(');
          window.location.reload();
        });
    }
  }

  commentPost(message: string, postId: number, postIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.createComment(post.id!, message)
      .subscribe(data => {
        post.comments!.push(data);
        window.location.reload();
      });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }
}
