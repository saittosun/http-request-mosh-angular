import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  authors;

  getAuthors() {
    return this.authors = [
      'author1', 'author2', 'author3'
    ];
  }

  constructor() { }
}
