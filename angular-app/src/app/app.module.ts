import { PostService } from './services/post.service';
import { HttpModule } from '@angular/http';

import { NewAuthorsComponent } from './new-author.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthorsServices } from './authors.services';
import { TitleCasesComponent } from './title-cases/title-cases.component';
import { PostsComponent } from './posts/posts.component';
import { AppErrorHandler } from './common/app-error-handler';


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
    AuthorsServices,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
