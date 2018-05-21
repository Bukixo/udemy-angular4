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

  updatePost(post) {
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .subscribe(response => {
        console.log(response.json());
      });
  }

~~~

### DELETING DATA

~~~
deletePost(post) {
  this.http.delete(this.url + '/' + post.id)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
}
~~~

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

Classes should only be responsible for only one thing or else it violates the princple of 'seperation of concern' which makes componenets harder to maintain and test. 
 
For instance when looking at the CRUD action, we may have the post method in several pages, thetfore if we needed to make a change on the url, we would have to make the change across several different places.

A solution to this would be creating a service which would be pruely responsible for dealing with the backend. All the details working with gthe backend will be encasuplated in one space which makes it easier to update.

###Creating Services

We firstly create a service component 
~~~
ng g s post
~~~

Inside the app.module we add PostService inside the providers array and also specific where the services are imported from.
 
~~~
import { PostService } from './services/post.service';
///

 ],
  providers: [
    PostService,
    AuthorsServices
  ],
~~~

Secondly, we create a Services folder and put all the services inside.
We then go to the posts.components and the first thing we move is the url, which is the implementation detail about working with our backend

~~~
./posts.component.ts

 @Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'https://jsonplaceholder.typicode.com/posts'; /////remove url
  constructor(private service: PostService) {}
~~~

Once the url has been moved, we then inject the private http class which is also imported from the top 

~~~
/services/post.services.ts

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts'; ///insert url here
  
  constructor(private http: Http) { }
~~~

In our post.component.ts in teh contrustcor we replace the private http parameter with our service. So we shouldn't inject our http class in our components as its a different concern, we let the services take care of it.

~~~
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core'; 
///import { Http } from '@angular/http'; <- import statement is removed

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  ///constructor(private http: Http) <- this is changed
  constructor(private service: PostService) {}

  ngOnInit() {
  ////
~~~

#####get Service
To modify the ngOnInit() method, the first line where we call the get moethod of th http class, will be removed and insteasd we creat a new method in our services class which calls the get method.

~~~
// from this 

ngOnInit() {
  this.http.get(this.url)
      .subscribe(response => {
        this.posts = response.json();
      });
  }

// to this 

ngOnInit() {
  this.service.getPosts()
      .subscribe(response => {
        this.posts = response.json();
      });
  }
~~~

Inside the post.component.ts 'http.get(this.url)' is replaced by 'service.getPosts()' and inside our post.services.ts we create a getPosts() which calls out the get method.

~~~
@Injectable()
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  
  constructor(private http: Http) { }
  
  getPosts() {
    return this.http.get(this.url);
  }

~~~
#####create Service

Inside post.component.ts

~~~
//from this 

createPost(input: HTMLInputElement) {

    const post: any = { title: input.value };
    input.value = ' ';

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post.id = response.json().id;
        this.posts.splice(0, 0, post);
        console.log(response.json());
      });
  }
 
 // to this
 
  createPost(input: HTMLInputElement) {
  
    const post = { title: input.value };
    input.value = '';
    
    this.service.createPost(post)
    .subscribe(response => {
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);
    });
  }
~~~ 

Inside post.service.ts

~~~
//
  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post));
  }
  //
~~~ 

#####update Service

Inside post.component.ts

~~~
//from this 

  updatePost(post) {
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .subscribe(response => {
        console.log(response.json());
      });
  }
 
 // to this
 
  updatePost(post) {
    this.service.updatePost(post)
    .subscribe(response => {
      console.log(response.json());
    });
  }
 
~~~ 

Inside post.service.ts

~~~
//
  updatePost(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }
  //
~~~ 
#####delete Service

Inside post.component.ts

~~~
//from this 
	 deletePost(post) {
    this.http.delete(this.url + '/' + id);
      .subscribe(response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }
  
 
 // to this
 
   deletePost(post) {
    this.service.deletePosts(post.id)
      .subscribe(response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }
 
~~~ 

Inside post.service.ts

We only need the id in order to be specifc.

~~~
deletePosts(id) {
    return this.http.delete(this.url + '/' + id);
  }
}

~~~ 

###Handling Errors

When dealing with errors we have two main types of errors

Unexpected error

- Server is offline - client sends request to the server but server is not running to recieve the request
- Network is down - server is online but client cannot reach it ie faulty url
- Unhandled exceptions - Due to bugs

Expected errors
 
- "Not found" error (404) - performing a crud action with an object that no longer exists
- "Bad request" errors (400) - If theres a problem with the data that a user is trying to send to the server, the server will respond with a bad reuqest

####Handling Unexpected errors

To change our implemnation to handle unexpected error we add another optional paramter in our subscribe method - error 

~~~

  ngOnInit() {
  this.service.getPosts()
      .subscribe(
        response => {
        // console.log(response.json());
        this.posts = response.json();
        },
        error => {
          alert('An unexpeted error occured!!!!');
          console.log(error);
        });
    }

~~~

The exact same code is applied on all the crud methods.

#### Handling expected errors
 
When dealing with expected errors, we know for example, that posts with a given id does not exist in the server, which should throw a 404 error to the user.

Firstly we need to check for the status of the response. In order to get the intelisense to check for the status, we need to change the type of error, which is currently 'any' to the 'Response' Class. Then we send an invalid id to fake the error.

~~~
deletePost(post) {
    this.service.deletePosts(345)
      .subscribe(
        response => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: Response) => {
          if (error.status === 404 ) {
            alert('Post already deleted');
          } else {
            alert('An unexpeted error occured!!!!');
          console.log(error);
          }
        });
    }
~~~

Now to handle 400 error due to bad data, we annote the error handler with a reaponse class and then cehck the status on the response.

Instead of an alert we pretend we are working on a form and as want to dsiaply the error next to input fields.  

~~~
createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';
    this.service.createPost(post)
    .subscribe(
      response => {
        post['id'] = response.json().id;
        this.posts.splice(0, 0, post);
      },
      (error: Response) => {
        if (error.status === 400) {
          // this.form.setErrors(error.json());
        } else {
          alert('An unexpeted error occured!!!!');
        console.log(error);
        }
      });
    }
~~~

The line won't compile as don't have a form.
