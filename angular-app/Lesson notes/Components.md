# Components

Components are the basic building blocks of an app. They act as containers and store the logic of the view, data and the html markup. The steps to creating a component are

1. Defining a component
2. Registering the newly created component in to a module
3. Declaring the the HTML markup

Modules also a acts a vessel which as it holds grouped components.

~~~
// Imports
import { Component } from '@angular/core';

// Component Decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Component Class
export class AppComponent {
  title = 'app works!';
}

~~~

### Component Import

~~~
import { Component } from '@angular/core';
~~~
To make a class a component we import the Component memember from the @angular/core library. Here is also where we import any services.

### Component Decorator
The Decorator essentially constructs the class. The @Component is using the Component that was imported.

Within the component we have a variety of configuration properties that help define a given component
	1. selector: This is the name of the tag that the component is applied to.
	2. templateURL & styleURLS: These define the HTML template and stylesheets associated with this component. You can also use template and styles properties to define inline HTML and CSS.

~~~
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
~~~

### Component Class

This is where the various properties and methods are defined. Any properties and methods here are accessible form the template. And likewise, events that occur in the template are accessible within the component.

~~~
export class AppComponent {
  title = 'app works!';
}
~~~

We can also use the cli to create a component

~~~
ng g component my-new-component
~~~

/////////////////////////////////////////////////////////////////////////////

####Templating basics

When you use the Angular CLI to generate an Angular project, it uses the templateUrl metadata property to define an external template by default.

As a general rule of thumb, you use templateUrl to define a template whenever there's a considerable amount of HTML associated with the given component. Otherwise, if you use inline HTML within the component itself, it will become quite unorganized and hard to navigate.

But what if your component only has a few lines of HTML? In this case, it may make sense to define inline HTML.

####Interpolation

Interpolation is just a fancy word for displaying data in the template. This data is usually defined within the component class.

~~~
@Component({
// Other component properties removed
  template: `
  <h1>Hey guys!</h1>
  <p>{{ myObject.gender }}</p>
  `,
})

export class AppComponent {

  myObject = {
    gender: 'male',
    age: 33,
    location: 'USA'
  };

}
~~~

##### *ngFor and Iterables

To display an array or an array of objects we use the *ngFor directive

~~~
@Component({
// Other component properties removed.
  template: `
  <h1>Hey guys!</h1>
  <ul>
    <li *ngFor="let arr of myArr">{{ arr }}</li>
  </ul>
  `,

})
export class AppComponent {

  myArr = ['him','hers','yours','theirs'];

}
~~~

####Services

We have two options to call an HTTP service in either the component or in a seperate file. Defining the logic to call an HTTP service within the component causes the following problems -

1. Unit testing becomes difficult to carry out as the http service becomes too tighlty coupled with the componenent as we don't want to depended on live http endpoints.
2. Somehwere in the app we may be using the using the same logic to consume data therefore we would have to repeat ourselves.
3. A component should not contain any logic apart from the presentation logic for instance what should happen when we click a button. Details on data consumtption should be delegated in a different area.

Therefore Angualar uses Services - we define a seperate Service Class there we will add the logic to retrieve data. This class will also be resuable across the application.

#### Creating a service class

Create  a new file

~~~
courses.service.ts
~~~

Export a plain typescript class

~~~
export class CoursesServices {
	getCourses(){
		return ["course1", "course2", "course3"];
	}
}
~~~

With this implentation we can reuse this code across our application.
So back to the courses.component.ts, we won't have any logic to carry out http services and that allows us to carry out unit testing without having to depending on on the http service.

~~~
export class CoursesComponent {
	title = "List of courses";
	courses;
}
~~~


#### Dependency injection

There are several ways in how we use the service within the components

~~~
export class CoursesComponent {
	title = "List of courses";
	courses;
	
	constructor() {
		let service = new CoursesService(); 
		this.courses = serivce.getCourses();
	}
}
~~~

The problem with this implementation is that by defining 

~~~
let service = new CoursesService(); 
~~~
we have tightly coupled the component with the http service which would lead to  issues when running unit tests. 

A better solution would be as followed:

~~~
export class CoursesComponent {
	title = "List of courses";
	courses;
	
	constructor(service: CoursesService) {
	
		this.courses = service.getCourses();
	}
}
~~~


When Angular is creating an instance, it looks at this constructor and sees that it has a dependency which is of type courses service. So it creates an instance of the courses services and then passes that to the constructors. If we change the constructor and add a new parameter we dont have to change hundreds of places in our code to reflect the code. 

Now we need to inject the dependency of the class into the constructor but inorder for this to work we need to register this dependency in our modules.
So inside app.module the provider contains all the depencies that componenets in rhis module are depended on. So Courses compenent is depended on Courses Service

~~~
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
  	CoursesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
~~~

This is what the courses.component should look like

~~~
import { Component } from '@angular/core';
import { CoursesServices } from './courses.services';

@Component({
  selector: 'courses',
  template: ` {{ title }}
  <ul>  
    <li *ngFor="let course of courses"> {{ course }} </li> 
  </ul>`,
})

export class NewAuthorsComponent {
    title = "List of courses";
    courses;
    constructor(service: CoursesServices ){
        this.courses = service.getCourses();
    } 
}

~~~

####Using CLI to create a Service

~~~
ng g s email
~~~







