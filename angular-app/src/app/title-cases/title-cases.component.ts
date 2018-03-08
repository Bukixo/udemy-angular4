import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-cases',
  template: '<input [(ngModel)] ="text" /> <br> {{ text }} ',
  styleUrls: ['./title-cases.component.css']
})
export class TitleCasesComponent {
  text = 'write something here';
  // constructor() { }

  // ngOnInit() {
  // }

}

// set up view to html connection
// set up html form
// print out message from form on to the view view

// use pipe to create the uppercases for every first leter of the words
// write logic that excludes 'of' and 'the' unless they begin at the sentence
