import { Component } from '@angular/core';
import { isString } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-mosh-app';
  star = {
    isStar: true
  };

  tweet = {
    body: 'hello',
    isLiked: false,
    likesCount: 10
  };

  onChangeStar(isStar) {
    console.log('star changed: ', isStar);
  }
}

