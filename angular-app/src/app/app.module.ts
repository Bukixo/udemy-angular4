import { PostService } from './services/post.service';
import { HttpModule } from '@angular/http';

import { NewAuthorsComponent } from './new-author.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthorsServices } from './authors.services';
import { TitleCasesComponent } from './title-cases/title-cases.component';
import { PostsComponent } from './posts/posts.component';





@NgModule({
  declarations: [
    AppComponent,
    NewAuthorsComponent,
    TitleCasesComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PostService,
    AuthorsServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
