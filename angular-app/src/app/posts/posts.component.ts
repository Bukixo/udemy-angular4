import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input-error';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(private service: PostService) {}

ngOnInit() {
  this.service.getAll()
      .subscribe(posts => this.posts = posts);
    }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    this.posts.splice(0, 0, post);

    input.value = '';
    //
    this.service.create(post)

    .subscribe(
      newPost => {
        post['id'] = newPost.id;
      },
      (error: AppError) => {
        this.posts.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(error.originalError;
        } else {
          throw error;
        }
      });
    }

  updatePost(post) {
    this.service.update(post)
    .subscribe(
      updatedPost => {
        console.log(updatedPost);
      });
  }
  deletePost(post) {
    const index = this.posts.indexOf(post); // we delete the post straight away
    this.posts.splice(index, 1);

    this.service.delete(post.id) /// then we call the service
      .subscribe(
        null,
        (error: AppError) => {
          this.posts.splice(index, 0, post); // however if an error occurs we want to rollback our change and readd our change
          if (error instanceof NotFoundError) {
            alert('Post already deleted');
          } else {
            throw error;
          }
        });
    }
}
