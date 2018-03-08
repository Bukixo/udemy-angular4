import { Component } from '@angular/core';
import { AuthorsServices } from './authors.services';
import { Button } from 'selenium-webdriver';

@Component({
  selector: 'author',
  template: ` {{ title }}
  <ul>
    <li *ngFor="let author of authors"> {{ author }} </li>
  </ul>
  <button (click)="onSave()" class="btn btn-primary">{{ message }}</button>
  `
})

export class NewAuthorsComponent {
    title = 'List of Authors';
    message = 'hello';
    authors;
    constructor(service: AuthorsServices ) {
        this.authors = service.getAuthors();

    }
    onSave() {
      this.message = 'hi';
   }
}