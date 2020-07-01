import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { AppError } from '../common/app-error';
import { InternalServerError } from '../common/internal-server-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
import { UnavailableError } from '../common/unavailable-error';

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
        (error: AppError) => {
          if (error instanceof BadRequestError) {
            alert('Invalid Data.');
          }
          else if (error instanceof InternalServerError) {
            alert('Internal Server Error');
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
      },
      (error: AppError) => {
        if (error instanceof BadRequestError) {
          alert('Invalid Data.');
        }
        else if (error instanceof NotFoundError) {
          alert('No HTTP resource was found that matches the request URI.');
        }
        else if (error instanceof InternalServerError) {
          alert('Internal Server Error');
        }
        else {
          alert('An unxepcted error occurred');
        }
      });
  }

  onDeletePost(post) {
    this.postService.deletePost(post.id)
      .subscribe(
        response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('No HTTP resource was found that matches the request URI.');
          }
          else if (error instanceof InternalServerError) {
            alert('Internal Server Error');
          }
          else {
            alert('An unxepcted error occurred');
          }
        });
  }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe(response => {
        this.posts = response;
        console.log(this.posts);
    }, (error: AppError) => {
      if (error instanceof UnavailableError) {
        alert('Customer API is unavailable at the moment. Please contact app support.');
      }
      else if (error instanceof NotFoundError) {
        alert('No HTTP resource was found that matches the request URL.');
      }
      else if (error instanceof InternalServerError) {
        alert('Internal Server Error');
      }
      else {
        alert('An unexpected error occurred.');
      }
    });
  }

}
