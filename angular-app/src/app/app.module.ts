import { NewAuthorsComponent } from './new-author.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthorsServices } from './authors.services';




@NgModule({
  declarations: [
    AppComponent,
    NewAuthorsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AuthorsServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
