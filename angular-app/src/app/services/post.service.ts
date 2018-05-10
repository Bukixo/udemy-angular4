import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  //
  constructor(private http: Http) { }
  //
  getPosts() {
    return this.http.get(this.url);
  }
  //
  createPosts() {
    const post: any = { title: input.value };
    input.value = ' ';
    return this.http.post(this.url, JSON.stringify(post));
  }
  //
  updatePosts() {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }
  //
  deletePosts() {
    return this.http.delete(this.url + '/' + post.id);
  }
}

