## Consuming HTTP Services

###JSONPlaceholder

###Get requests - Getting data 

Firstly, to consume http services we go to **app.module.ts** and import the http module.

~~~~
import { HttpModule } from '@angular/http';

import { NewAuthorsComponent } from './new-author.component';

///////

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
  /////
~~~~

Then inside out **post.component.ts** we import the class and build out our component. It is worth checking in the browser that the component works before adding the http request.

~~~
import { Http } from '@angular/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[];

  constructor(http: Http) {
    http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(response => {
        // console.log(response.json());
        this.posts = response.json();
      });
  }}
~~~

The Subscribe function just like the Promise, to work with ansyrnchious or non blocking operations. Due to the delay of getting data, to avoid the thread of getting blocked we use the Subscribe to notify when it's ready.

Inside the posts.component.html we display the data in our view.

~~~
<ul class="list-group">
  <li 
    *ngFor="let post of posts"
    class="list-group-item">
    {{ post.title }}
  </li>
</ul>
~~~

###Put Request - Creating data

To add the ability to create a new post we firstly create an input field and assign a method with a reference as an argument (title).

~~~
<input
(keyup.enter)="createPost(title)" #title
 type="text" class="form-control">
<ul class="list-group-item">
  <li 
    *ngFor="let post of posts"
    class="list-group">
    {{ post.title }}
  </li>
</ul>
~~~

We then build out the method that creates a put request and creates new data.

~~~~


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {
    http.get(this.url)
      .subscribe(response => {
        // console.log(response.json());
        this.posts = response.json();
      });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = ' ';

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post.id = response.json().id;
        this.posts.splice(0, 0, post);
        console.log(response.json());
      });
  }
}
~~~~

###Updating 

To implment the abilityto update data we add a button that handles a click event. We bind to upDATEpost method in our component then as the aguemtn is send the post object.

~~~

<input
(keyup.enter)="createPost(title)" #title
 type="text" class="form-control">
<ul class="list-group">
  <li 
    *ngFor="let post of posts"
    class="list-group-item">
    <button 
      (click)="updatePost(post)"
      class="btn btn-defualt btn-sm">update</button>
    {{ post.title }}
  </li>
</ul>
~~~

In out component I will add the updaePost method.
The difference between the patch and put menthod is that we use the patch method to update only a few porpteries in a object. So rather than sending the complete object to the server we only send theporperties that should be modified.

Patch: 

~~~
this.http.patch(this.url, JSON.stringify({isRead: true}))
~~~

Put:

~~~
this.http.patch(this.url, JSON.stringify({post}))
~~~

When using the patch/put it's important to reference a specific post by appending an id to the post.

~~~
this.posts.splice(0, 0, post);
        console.log(response.json());
      });
  }

  updatePost(post) {
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .subscribe(response => {
        console.log(response.json());
      });
  }
}
~~~

### DELETING DATA

####OnInit Interface
Initially we call the the http requests to access the posts inside the constructor, however as a good practice, constructors should be very lightweight and not perform expensive operations.

During lifecycle hooks of a component which are -

* Creating a component
* Rendering it
* Creating and rendering its children

Angular calls for specific methods durong a lifecycle. One of them being 'ngOnInit'.


~~~
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'https://jsonplaceholder.typicode.com/posts'; 
  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.get(this.url)
      .subscribe(response => {
        // console.log(response.json());
        this.posts = response.json();
      });
  } 
~~~

Do not call http requests inside the constructors of your component. To initalise use the ng oninit method.

###Seperation of concerns and Creating Services 
 
 
 
 
 
 
 
 
 
 
 