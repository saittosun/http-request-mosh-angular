import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  title = 'angular';
  authors = [];
  isActive: boolean;
  content: '';
  @Input() isStar: boolean;
  @Output('starChanged') click = new EventEmitter();


  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.isActive = true;
    this.authors = this.authorService.getAuthors();
  }

  onClick() {
    this.isStar = !this.isStar;
    this.click.emit(this.isStar);
  }

}
