import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { UnavailableError } from '../common/unavailable-error';
import { BadRequestError } from '../common/bad-request-error';
import { InternalServerError } from '../common/internal-server-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  createPost(post) {
    return this.http.post(
      this.url,
      JSON.stringify(post),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
      .pipe(catchError(this.handleError));
  }

  updatePost(post) {
    return this.http.patch(
      this.url + '/' + post.id,
      JSON.stringify({isRead: true}),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
    .pipe(catchError(this.handleError));
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(new UnavailableError(error));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    if (error.status === 400) {
      return throwError(new BadRequestError(error));
    }
    if (error.status === 500) {
      return throwError(new InternalServerError(error));
    }
    return throwError(new AppError(error));
  }

}
