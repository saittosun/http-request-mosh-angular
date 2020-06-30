import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  categories = [
    {id: 1, name: 'development'},
    {id: 2, name: 'angular'},
    {id: 3, name: 'react'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  submit(f) {
    console.log(f);
  }

}
