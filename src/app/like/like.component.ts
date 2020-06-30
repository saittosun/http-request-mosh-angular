import { Component, OnInit, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() isActive: boolean;
  @Input() likesCount: number;

  constructor() { }

  ngOnInit(): void {
  }

  onActive() {
    this.likesCount += (this.isActive) ? -1 : 1;
    this.isActive = !this.isActive;
  }

}
