import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts;

  constructor(private postService: PostService) { }

  createPost(input: HTMLInputElement) {
    const post = {title: input.value};
    input.value = '';
    this.postService.createPost(post)
      .subscribe(
        response => {
        post['id'] = response;
        (this.posts as any[]).splice(0, 0, post);
        },
        (error: Response) => {
          if (error.status === 400) {
            // this.form.setErrors(error.json())
          }
          else {
            alert('an expected error has occured');
            console.log(error);
          }
        });
  }

  onUpdatePost(post) {
    this.postService.updatePost(post)
      .subscribe(response => {
        console.log(response)
      })
  }

  onDeletePost(post) {
    this.postService.deletePost(post.id)
      .subscribe(
        response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        },
        (error: Response) => {
          if (error.status === 404) {
            alert('this post has already been deleted.')
          }
          else {
            alert('an expected error has occured');
            console.log(error);
          }
        });
  }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe(response => {
        this.posts = response;
        console.log(this.posts);
    }, error => {
      alert('unexpected error has occured');
    });
  }

}
