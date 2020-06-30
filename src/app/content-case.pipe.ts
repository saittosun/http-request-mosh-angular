import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentCase'
})
export class ContentCasePipe implements PipeTransform {

  transform(value: string): unknown {
    if (!value) {
      return null;
    }
    const prepositions = ['of', 'the'];
    const words = value.split(' ');
    // console.log(words);
    for (let i = 0; i < words.length; i++) {
      console.log(words.length);
      if (prepositions.includes(words[i].toLowerCase())) {
        if (i === 0) {
          words[i] = words[i].substr(0, 1).toUpperCase() + words[i].substr(1).toLowerCase();
        } else {
          words[i] = words[i].toLowerCase();
        }
      } else {
        words[i] = words[i].substr(0, 1).toUpperCase() + words[i].substr(1).toLowerCase();
      }
    }
    return words.join(' ');
  }

}
