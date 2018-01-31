import { Component } from '@angular/core';
import { AuthorsServices } from './authors.services';

@Component({
  selector: 'author',
  template: ` {{ title }}
  <ul>  
    <li *ngFor="let author of authors"> {{ author }} </li> 
  </ul>`,
})

export class NewAuthorsComponent {
    title = "List of Authors";
    authors;
    constructor(service: AuthorsServices ){
        this.authors = service.getAuthors();
    } 
}