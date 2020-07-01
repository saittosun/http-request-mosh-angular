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
      .subscribe(response => {
        post['id'] = response;
        (this.posts as any[]).splice(0, 0, post);
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
      .subscribe(response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe(response => {
        this.posts = response;
        console.log(this.posts);
    });
  }

}
