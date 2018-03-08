import { NewAuthorsComponent } from './new-author.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthorsServices } from './authors.services';
import { TitleCasesComponent } from './title-cases/title-cases.component';




@NgModule({
  declarations: [
    AppComponent,
    NewAuthorsComponent,
    TitleCasesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    AuthorsServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
