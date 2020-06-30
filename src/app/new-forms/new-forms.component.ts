import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-forms',
  templateUrl: './new-forms.component.html',
  styleUrls: ['./new-forms.component.css']
})
export class NewFormsComponent  {
  form = new FormGroup({
    topics: new FormArray([])
  });

  addTopic(topic: HTMLInputElement) {
    this.topics.push(
      new FormControl(topic.value)
    );
    topic.value = '';
  }

  get topics() {
    return this.form.get('topics') as FormArray;
  }

  onRemove(topic: FormControl) {
    const index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }
}
