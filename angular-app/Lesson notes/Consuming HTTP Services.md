Consuming HTTP Services
=
###JSONPlaceholder

##Get requests - Getting data 


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

The Subscribe function, just like the Promise, is used to work with asynchronous or non blocking operations. To avoid the thread of getting blocked we use the Subscribe to notify when it's ready.

Inside the **post.component.html** we display the data in our view.

~~~
<ul class="list-group">
  <li 
    *ngFor="let post of posts"
    class="list-group-item">
    {{ post.title }}
  </li>
</ul>
~~~

##Put Request - Creating data

To add the ability to create a new post, we firstly create an input field and assign a method with a reference as an argument (title).

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

##Update Request - updating data

To implment the ability to update data, we add a button that handles a click event. We bind to the update post method in our component then the arguement is sent to the post object.

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

In out component we add the updatePost method.
The difference between the patch and put menthod is that we use the patch method to update only a few properties in an object. So rather than sending the complete object to the server we only send the properties that should be modified.

Patch: 

~~~
this.http.patch(this.url, JSON.stringify({isRead: true}))
~~~

Put:

``` javascript
this.http.patch(this.url, JSON.stringify({post}))
```

When using the patch/put it's important to reference a specific post by appending an id to the post.

~~~

  updatePost(post) {
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .subscribe(response => {
        console.log(response.json());
      });
  }

~~~

## DELETING DATA

~~~
deletePost(post) {
  this.http.delete(this.url + '/' + post.id)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
}
~~~

##OnInit Interface
Initially we call the the http requests to access the posts inside the constructor, however as a good practice, constructors should be very lightweight and not perform expensive operations.

Lifecycle hooks of a component are -

* Creating a component
* Rendering it
* Creating and rendering its children

Angular calls for specific methods during a lifecycle. One of them being 'ngOnInit'.

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

We do not call http requests inside the constructors of your component. To initalise use the **ng oninit** method.

##Seperation of concerns and Creating Services

Classes should only be responsible for only one thing or else it violates the princple of 'seperation of concern' which makes componenets harder to maintain and test. 
 
For instance when looking at the CRUD action, we may have the post method in several pages, therefore if we needed to make a change on the url, we would have to make the change across several different places.

A solution to this would be creating a service which would be purely responsible for dealing with the backend. All the details working with the backend will be encasuplated in one space which makes it easier to update.

##Creating Services

We firstly create a service component 

~~~
ng g s post
~~~

Inside the **app.module** we add PostService inside the providers array and also specific where the services are imported from.
 
~~~
import { PostService } from './services/post.service';
///

 ],
  providers: [
    PostService,
    AuthorsServices
  ],
~~~

Secondly, we create a Services folder and put all the service files inside.
We then go to the **post.component.ts** and the first thing we move is the url, which is the implementation detail for our backend.

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

Once the url has been moved, we then inject the private http class which is also imported at the top .

~~~
/services/post.services.ts

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts'; ///insert url here
  
  constructor(private http: Http) { }
~~~

In our **post.component.ts**, in the constructor, we replace the private http parameter with our service. So we shouldn't inject our http class in our components as its a different concern, we let the services take care of it.

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

##get Service
To modify the ngOnInit() method, the first line where we call the get method of the http class, will be removed and instead we create a new method in our services class which calls the get method.

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

Inside the **post.component.ts**, 'http.get(this.url)' is replaced by 'service.getPosts()' and inside our **post.services.ts** we create a **getPosts()** which calls out the get method.

~~~
@Injectable()
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  
  constructor(private http: Http) { }
  
  getPosts() {
    return this.http.get(this.url);
  }

~~~
##create Service

Inside **post.component.ts**:

~~~
//from this 

createPost(input: HTMLInputElement) {

    const post: any = { title: input.value };
    input.value = ' ';

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post.id = response.json().id;
        this.posts.splice(0, 0, post);
      });
  }
 
 // to this
 
  createPost(input: HTMLInputElement) {
  
    const post = { title: input.value };
    input.value = '';
    
    this.service.createPost(post) //replaced the http with the service
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

##update Service

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
##delete Service

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

##Handling Errors

When dealing with errors we have two main types of errors

### Unexpected error

- Server is offline - client sends request to the server but server is not running to recieve the request
- Network is down - server is online but client cannot reach it ie faulty url
- Unhandled exceptions - Due to bugs

### Expected errors
 
- "Not found" error (404) - performing a crud action with an object that no longer exists
- "Bad request" errors (400) - If theres a problem with the data that a user is trying to send to the server, the server will respond with a bad reuqest

##Handling Unexpected errors

To change our implementation to handle unexpected errors we add another optional parameter in our subscribe method - **error** 

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

## Handling Expected errors
 
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

Now to handle 400 error due to bad data, we annote the error handler with a reaponse class and then check the status on the response.

Instead of an alert we pretend we are working on a form and as want to display the error next to input fields.  

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

>The line won't compile as we don't have a form.

##Throwing Application specific errors

An Issue that comes with this implementation is that it violates the seperation of concern. As we are working with the repsonse object which comes from the server it should be moved inside our service.

~~~
////
      },
      (error: Response) => {
        if (error.status === 400) {
         
        /////
~~~

Firstly we want to make sure that if we are faced with an error, we would want to catch the error and instead of sending our response object to the component, we want to send a different object that is part of our application domain.

To catch the error we add a new parameter to the Observable (Observable is a type part of a third party called reactive extensions). The methods within the Observeables are not automatically available therefore we need to import it first then add the ".catch" to catch the error and send a different kind of object to the consumer of this service wihc our post component.

Then we return an obserable with an error.
The "Observable.throw()" will rertun a new obseravble that will have an error

~~~
post.service.ts


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


  deletePost(post) {
    return this.http.delete(this.url + '/' + post.id)
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw();
        
      });
  }
}
~~~

The type of the error should be something that is specific to our application not repsonse object. So we need to create a new class for application specific errors. Therefore we create a new file './common/app-error.ts' 

We export the class AppError class so we can represent an application error. 

~~~
app-error.ts 


export class AppError {
    constructor(public originalError?: any) {}
}
~~~

Now we can pass our AppError object. We include the original error because somewhere we are going to get that error and log it into our server.

Catching an error object which is an instance of an Response class and then we are returning and different kind of error thats specific to our application.

~~~
post.service.ts


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


  deletePost(post) {
    return this.http.delete(this.url + '/' + post.id)
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(new NotFoundError());
        } 
      });
  }
}

~~~
Now we need to change the implementation so that we can check for the status of our error ie 400 or 404 and return a different kind of error.

To begin we create a new file called not-found-error-.ts and here we export the class NotFoundError. we want the class to derive from the AppError because this is the a specific application error.

~~~
not-found-error-.ts


import { AppError } from './app-error';

export class NotFoundError extends AppError {}
~~~

We write and if statement that checks the status of the error and we retrun an observable that has an error and the type of error is NotFoundError.

~~~
post.service.ts


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


  deletePost(post) {
    return this.http.delete(this.url + '/' + post.id)
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(new NotFoundError());
        } else {
          return Observable.throw(new AppError(error));
        }
      });
  }
}

~~~

The type of the error is changed to AppError and we check if the error is an 'instance" of NotFoundError
~~~
post.component.ts


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
~~~
To handle bad request errors we follow the same suit.
It is also worth noting that Observables a bunch of methods that we call operators such as catch which we needed to expliclty had to import. Same has to be done with the throw method.

~~~
post.service.ts


import 'rxjs/add/observable/throw';
~~~

~~~
bad-inpout-error.ts

import { AppError } from './app-error';

export class BadInput extends AppError {}
~~~

~~~
createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .catch((error: Response) => {
        if (error.status === 400) {
          return Observable.throw(new BadInput(error.json()));
        } else {
          return Observable.throw(new AppError(error.json()));
        }
      });
  }
~~~

~~~
post.component.ts

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input-error';



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
          // this.form.setErrors(error.originalError; <-as we dont have a form
        } else {
          alert('An unexpeted error occured!!!!');
        console.log(error + 'something bad happend');
        }
      });
    }
~~~


###Global Error handling

Looking at the methods inside the post.component.ts we see that either 

~~~
else {
	alert('An unexpeted error occured!!!!');
    console.log(error + 'something bad happend');
  }
~~~

or 
~~~
,
 error => {
      alert('An unexpeted error occured!!!!');
      console.log(error);
});

~~~

is repeated in multiple places. In order to keep the code clean and refactor this, we create a global error handler.

Firstly we create a file "app-error-handler.ts inside the common folder.

We export a class that is responible for handling all the global errors in our application. We have a inbuilt class "ErrorHandler" which we can use.
We then move the instructions for our errors.

~~~
import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('An unexpected error occured!!!!');
        console.log(error );
    }
}
~~~

Next we want to decakre it as a dependency in our app.module.ts. As we register it into the providers array we want to make sure that whereever we use ErrorHandler internally, we replace it with the new AppErrorHandler class.

~~~
],
  providers: [
    PostService,
    AuthorsServices,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
~~~

Then inside our post.component.ts we clean out our code.

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
~~~

to this 

~~~
ngOnInit() {
  this.service.getPosts()
      .subscribe(
        response => {
        // console.log(response.json());
        this.posts = response.json();
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
          throw error; // if we dont rethrow our error in the if statement itll never hit the global error handler
        }
      });
    }

  updatePost(post) {
    this.service.updatePost(post)
    .subscribe(
      response => {
        console.log(response.json());
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
            throw error;
          }
        });
    }
}
~~~

### A resuable Error handling method

In our  poat.service.ts code we see that the 

~~~
if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    } else {
      return Observable.throw(new AppError(error));
    }
~~~
 and 
~~~
if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
~~~
Is heavily repeated.

A way to refactor this, is by extracting a seperate private method called handleError where we can delegate the the error into that new method.

The reason why we define it as private is because this is purely the implemntation detail of this post.service. We dont want the consumers of this service to know about this method. The post compment should not call this person from the outside. it only has access to the delete, update, create and get.

~~~
private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    } else {
      return Observable.throw(new AppError(error));
    }
  }
}
~~~

Inside our crud methods, we pass in a refernce to our new handleError function.

~~~
data.service.ts 

//
  getPosts() {
    return this.http.get(this.url)
    .catch(this.handleError);
  }
  //
  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
    .catch(this.handleError);
  }
  //
  updatePost(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .catch(this.handleError);
  }
  //
  deletePost(id) {
    return this.http.delete(this.url + '/' + id)
      .catch(this.handleError);
  }
~~~

## Extracting Resubale Data Services

In a real world applications we may be working with several services. All of which would have an identical layout. To avoid ourselves from repeateing code we will extract a resuable service that will handle the the crud actions, http requests and error handling.

We firstly create a new file called **data.service.ts** and copy all the code from our **post.service.ts**. Then we ename the class "PostService" to "DataService".

Following that, we rename our methods so that they become generic and not attached to any of the post methods and the parameters will be replaced from "post" to "resource".

~~~
data.service.ts


import { AppError } from './../common/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input-error';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }
  //
  getAll() {
    return this.http.get(this.url)
    .catch(this.handleError);
  }
  //
  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
    .catch(this.handleError);
  }
  //
  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
      .catch(this.handleError);
  }
  //
  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    } else {
      return Observable.throw(new AppError(error));
    }
  }
}
~~~

In the post.service, we delete all the methods because we have already defined them in the data service. Then we want our code to inherhent all the classes that we have defined in our data.service.ts. So we use the inheritance syntax - "extends". Inside the constructor we use the super key-word to pass the http object and then we supply the url. Lastly we clean up the imports.

~~~
import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService extends DataService {
  constructor(http: Http) {
    super('https://jsonplaceholder.typicode.com/posts', http);
  }
}
~~~

Finally, in our post.component, we rename the http methods in accordance to data.service.ts

~~~
ngOnInit() {
//this.service.getPosts()
  this.service.getAll()
///     
  createPost(input: HTMLInputElement) {
    ////
    //this.service.createPost(post)
    this.service.create(post)
    /////
    
  updatePost(post) {
   	//this.service.updatePost(post)
    this.service.update(post)
    ////
    
   deletePost(post) {
    //this.service.deletePost(444)
    this.service.delete(444)
      /////
~~~

##Map Operators

One last issue we still have is the fact that we are still working with **responses** inside the post.component. 

~~~
.subscribe(
	response => {
	/////
	});
~~~

This is something that needs to be moved into our services with the help of the **.map** operator.

Inside our **dataService.service.ts**, we use the obserable operators - map, to tranform items inside an observable.

First we import the operator as they are not availble by default (unused operators will increase the size of our application).

The we call out the map method - we are mapping/ transforming this repsonse to an array of js objects.

~~~
///
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
///

getAll() {
    return this.http.get(this.url)
    .map(response => response.json())
    .catch(this.handleError);
  }
~~~

So back in our post.component, instead of getting back a response, we get an array of objects.

~~~
ngOnInit() {
  this.service.getAll()
      .subscribe(posts => this.posts = posts);
    }
~~~

Back in our data.service.ts we modify all our responses using the map operator.

~~~
data.service.ts 

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }
  //
  getAll() {
    return this.http.get(this.url)
    .map(response => response.json())
    .catch(this.handleError);
  }
  //
  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
    .map(response => response.json())
    .catch(this.handleError);
  }
  //
  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
        .map(response => response.json())
        .catch(this.handleError);
  }
  //
  delete(resource) {
    return this.http.delete(this.url + '/' + resource.id)
        .map(response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    } else {
      return Observable.throw(new AppError(error));
    }
  }
}

~~~

and make the change accordingly in the **post.component.ts**.

~~~
///
createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';
    this.service.create(post)
    .subscribe(
      newPost => {
        post['id'] = newPost.id;
        this.posts.splice(0, 0, post);
      },
      (error: AppError) => {
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
    this.service.delete(444)
      .subscribe(
        () => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('Post already deleted');
          } else {
            throw error;
          }
        });
    }
}
~~~

###Optimistic vs pesssmistic updates

With Pessimistic updates, as theres a short delay when there's a response to the server we are - "hopeless" as we only rely on a response if everything if we get a succesful reponse. With the optimistic approach however, instead of waiting to get a repsonse from the server, we udpate the user interface immediately we expect that the call to the server is going to succeed and if it fails for some reason we just rollback the change. This optimstic method gives the appearance of a much faster working application.

To create a optimistic update on our create flow, we firstly create a new object immediately and if we encounter any errors we just add a rollback function

~~~
post.component.ts 


createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    this.posts.splice(0, 0, post); // as soon as we create the post object we immediately update the post array

    input.value = ''; // then we clear our input
    //
    this.service.create(post) // and make a call to the server.

    .subscribe(
      newPost => {
        post['id'] = newPost.id; // if the server repsonds with a ok we set the post with a new id
      },
      (error: AppError) => {
        this.posts.splice(0, 1); // otherwise if something goes wrong we want to rollback our change and remove the new post.
        if (error instanceof BadInput) {
          // this.form.setErrors(error.originalError;
        } else {
          throw error;
        }
      });
    }
~~~

In the data.service.ts we similate a scenario where a call to the server fails by returning an error. Throw is a factory operator that creates
~~~
data.service.ts


 create(resource) {
       return Observable.throw(new AppError());
      // an obseravble object which contains an error.
    // return this.http.post(this.url, JSON.stringify(resource))
    // .map(response => response.json())
    // .catch(this.handleError);
  }
~~~

And the same is done in the delete method.

~~~
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
~~~

And fake en error in the service

~~~
 delete(id) {
    // return Observable.throw(new AppError());
    return this.http.delete(this.url + '/' + id)
        .map(response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: Response) {
  /////
~~~





