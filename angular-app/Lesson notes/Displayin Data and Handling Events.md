##Displaying Data

###Property Binding

With property binding we bind a property of the DOM element, like a <strong>src</strong> with to a field or property of our component.

~~~

import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<h2>{{ title }}</h2>
		<img src="{{ imageURL }}" /> //this interpolation works well 
		<img [src]="imageURL" />
	`
	})
	
	export class CoursesComponent {
		title = "List of courses";
		imageUrl = "http://picture.com";
	}

~~~

> Interpolation like <strong>{{ imageUrl }}</strong> works well for dynamic values between headings or where we want ot render text, because using the <strong>[ '' ] </strong> way would create a syntax like so 
> 
~~~
<h2 [textContent] ="title"></h2> 
~~~
which is more longer and verbose.


### Attribute binding

Most attributes of the html elements have a 1-1 mapping with the DOM such as src, however others such as Colspan don't have a representation in the DOM.
We also have DOM elements that do not have a HTML representation such as the [[TextConent]] that we created in the above exercise. 

~~~

import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<img [src]="imageURL" />
		<table>
			<tr>
				<td [colspan]="colSpan"></td>
			</tr>
		</table>
	`
	})
	
	export class CoursesComponent {
		colSpan= "2";
		imageUrl = "http://picture.com";
	}

~~~

We should remember that with property binding we are binding properties to the DOM elements not the HTML elements.

So for the exceptions that don't have a DOM representation we prefix the <strong>'attr.' </strong>tag to the syntax, that way we are telling angular that we targeting that specific attribute in the html element.

~~~
<td [attr.colspan]="colSpan"></td>
~~~

### Adding bootstrap

To install bootstrap 

~~~
npm install boostrap --save
~~~

To import boostrap on the style.css

~~~
@import "~boostrap/dist/css/boostrap.css"
~~~

### Class Binding

There are times where we would like to add classes to an element based on a condition.

~~~

import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<button class ="btn" [class.active]="isActive"></button>
	`
	})
	
	export class CoursesComponent {
		isActive= false;
		imageUrl = "http://picture.com";
	}

~~~

We kept the classes seperate because we wanted to keep the active class dynamic.

### Style Binding

Similar to Class binding but incorporating CSS styling depending on condition.

~~~ 
import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<button [style.backgroundColor]="isActive ? 'blue' : 'white' "></button>
	`
	})
	
	export class CoursesComponent {
		isActive= false;
		imageUrl = "http://picture.com";
	}
~~~

w3 schools website gives you a list of style attributes that you can use.

### Event binding

To bind events which we use to handle events raised from the DOM.

~~~ 
import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<button (click)="onSave()"> Save</button>
	`
	})
	
	export class CoursesComponent {
		onSave() {
		console.log("button clicked");
		}
	}
~~~

First we add the name of the event (click) and then when bind it to a method in our component "onSave()"

To get access information on the event we pass $event

~~~ 
import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<button (click)="onSave($event)"> Save</button>
	`
	})
	
	export class CoursesComponent {
		onSave($evetn) {
		console.log("button clicked", $event);
		}
	}
~~~

Passing that through gives us all the information of the element.
To avoid event bubbling, we use <strong>.stopPropogation</strong>.

~~~ 
import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<input ()></input>
	`
	})
	
	export class CoursesComponent {
		onDivClicked(){
			console.log("Div was clicked");
		}
		
		onSave($event) {
		$event.stopPropogation
		console.log("button clicked", $event);
		}
	}
~~~

### Event Filtering

~~~ 
import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<input (keyup.enter)="onKeyUp()"/>
	`
	})
	
	export class CoursesComponent {
		onKeyUp(){
			console.log("ENTER was clicked");
		}		
	}
~~~

### Template Variables

To get a value from the user field we create a reference, which in this case would be #email - this is called a template variable.

~~~ 
import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<input #email (keyup.enter)="onKeyUp(email.value)"/>
	`
	})
	
	export class CoursesComponent {
		onKeyUp(email){
			console.log(email);
		}			
	}
~~~

### Two - way Binding
With property binding the direction of binding goes from component to the view so if changes in the component takes place, it will be automatically changed in the view.

To create a binding that works in two ways - form component to the view and from the view to the component. The directive used for this is ngModel which is used to implement two way binding.

~~~ 

import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		<input [(ngModel)]="email" (keyup.enter)="onKeyUp()"/>
	`
	})
	
	export class CoursesComponent {
		email = "me@example.com";
		
		onKeyUp(email){
			console.log(email);
		}			
	}
~~~

When initally running the code we may come across an error in the console that states <strong>"can't bind ngModel" since it isn't a known property of 'input'."</strong>
Reason why this problem appears is because we need to import the module in the app.module file.

Inside the imports declarator we have the browser declartor which brings in features that almost every browers needs. So we need to add the forms module.

~~~
import { NewAuthorsComponent } from './new-author.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthorsServices } from './authors.services';


@NgModule({
  declarations: [
    AppComponent,
    NewAuthorsComponent
  ],
  imports: [
    BrowserModule
    FormsModule
  ],
  providers: [
    AuthorsServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
~~~

So now we should get two-way binding.


####Pipes

We use pipes to format data


#####Built it pipes

~~~ 
import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		{{ course.title | uppercase | lowercase}} <br/>
		{{ course.students | number }} <br/>
		{{ course.rating | number:'2.2-2' }} <br/>
		{{ course.price | currency:'AUD':true:'3.2-2' }} <br/>
		{{ course.releaseDate | date:'shortDate' }} <br/>
	`
	})
	
	export class CoursesComponent {
		course = {
			title: "Title Complete Angular Course",
			rating: 4.8473,
			students: 30123,
			price: 190.98,
			releaseDate: new Date(2016, 3, 1)
		}			
	}
~~~

Angular.io has all the available pipes.

##### Custom pipes

To create a summary pipe, we first add it on the template like below and supply an argument. Then create a new summary.pipe.ts.

~~~ 
import { Component } from '@angular/core';

@Component({
	selector: 'courses',
	template: `
		{{ title | summary: 5 }}
		
	`
	})
	
	export class CoursesComponent {
		title = {
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}			
	}
~~~

Inside the summary.pipe.ts we import the pipe declarator function and pipe transform which is an interface that defines all the of pipes within angular.

~~~
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'summary'
	})

export class SummaryPipe implements PipeTransform {
	transform(value: string, limit?: number, another?: any){
		if (!value)
			return null;
		
		let actualLimit = (limit) ? limit : 50;
		return value.substr(0, actualLimit) + '...';
	}
}

~~~

Once the algorithm is completed we need to import the pipe.

~~~
import { NewAuthorsComponent } from './new-author.component';
import { SummaryPipe } from './summary.pipe;
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthorsServices } from './authors.services';


@NgModule({
  declarations: [
    AppComponent,
    NewAuthorsComponent,
    SummaryPipe
  ],
  imports: [
    BrowserModule
    FormsModule
  ],
  providers: [
    AuthorsServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
~~~

