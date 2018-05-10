import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';


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
      .subscribe(response => {
        // console.log(response.json());
        this.posts = response.json();
      });
  }

  createPost(input: HTMLInputElement) {
    this.service.createPosts()
    .subscribe(response => {
      post.id = response.json().id;
      this.posts.splice(0, 0, post);
      console.log(response.json());
    });
  }

  updatePost(post) {
    this.service.updatePosts()
    .subscribe(response => {
      console.log(response.json());
    });
  }
  deletePost(post) {
    this.service.deletePosts()
      .subscribe(response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }l
}
