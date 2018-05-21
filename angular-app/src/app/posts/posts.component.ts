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
  this.service.getPosts()
      .subscribe(
        response => {
        // console.log(response.json());
        this.posts = response.json();
        },
        error => {
          alert('An unexpeted error occured!!!!');
          console.log(error );
        });
    }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';
    this.service.createPost(post)
    .subscribe(
      response => {
        post['id'] = response.json().id;
        this.posts.splice(0, 0, post);
      },
      (error: AppError) => {
        if (error instanceof BadInput) {
          // this.form.setErrors(error.originalError;
        } else {
          alert('An unexpeted error occured!!!!');
        console.log(error + 'something bad happend');
        }
      });
    }

  updatePost(post) {
    this.service.updatePost(post)
    .subscribe(
      response => {
        console.log(response.json());
      },
      error => {
        alert('An unexpeted error occured!!!!');
        console.log(error);
      });
  }
  deletePost(post) {
    this.service.deletePost(234)
      .subscribe(
        response => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('Post already deleted');
          } else {
            alert('An unexpeted error occured!!!!');
          }
        });
    }
}
