## Directives

## Directives

There are two types of directives
- Structural Directives modify the structure of the DOM
- Attribute Directives modify the attributes of the DOM elements

###ng-if
ng-if directives enables us to show or hide attributes in our page.

~~~
<div *ngIf="courses.length > 0; then coursesList else noCourses></div>
<ng-template #coursesList> //identifiers match the condition
	List of courses
</ng-template>
<ng-template #noCourses>
	No Courses yet
</ng-template>
~~~
>app.component.html  

### hidden attribute

Another way to show and hide attributes would be by using the 'hide' property like so

~~~
<div [hidden]="courses.length == 0>
	List of courses
</div>
<div [hidden]="courses.length > 0">
	No Courses yet
</div>
~~~

The main difference between between <strong>NgIf</strong> and <strong>hidden</strong> is that the the ngIf elements are removed from the DOM whereas with the hidden sttributes, elements are only hidden.

When working on a complex projects whereby the tree has large amounts of child dom elements there is a potential risk of taking up too much memmory and therefore it would be advised to use ngIf as attributes would be completely removed form the DOM and free up resources. This also can increase performance. So dealing with a small tree with objects, hidden is prefered.

### ngSwitch Case

ngSwitch Case helps us to switch across properties. The difference between ngswitch case and ngIf is that although you can switch across properties with ngIf, it only works with booleans. Therefore it wuldn work with multiple tabs.

We firstly start with a basic mark up using zen coding inside our app.component.html.

~~~
ul.nav.nav-pills

<ul class="nav nav-pills"></ul>

 //////

<ul class="nav nav-pills">
  (li>a)*2
</ul>

<ul class="nav nav-pills">
    <li><a href=""></a></li>
	<li><a href=""></a></li>
</ul>
~~~

Then we proceed to making the li tags active
~~~
<ul class="nav nav-pills">
   <li class="active"><a href="">Map View</a></li>
	<li><a href="">List View</a></li>
</ul>
<div>
	<div>Map View Content</div>
	<div> List View Content</div>
</div>
~~~

We check it's working in the frontend and then move on to making it dynamic.
So on the app.component.ts and define to keep track of the currently selected tab.

~~~
////
export class AppComponent {
	viewMode = 'map';
}
~~~

>The viewMode can hold any of the values - map or list

Back on the app.component.html we render the fields dynamically based on teh value of the viewMode field. So we add new property binding - ngSwitch and use to bind to a field of our class. We also add the click event to change the viewmode

~~~
<ul class="nav nav-pills">
   <li [class.active]="viewMode == 'map'"><a (click)="viewMode = 'map' ">Map View</a></li>
	<li [class.active]="viewMode == 'list'"><a (click)="viewMode = 'list'">List View</a></li>
</ul>
<div [ngSwitch]="viewMode">
	<div *ngSwitchCase="'map'">Map View Content</div>
	<div *ngSwitchCase="'list'"> List View Content</div>
	<div *ngSwitchDefault>Otherwise</div>
</div>
~~~

####ngFor

Used to render a list of objects.

So in the app.component.ts we are going to define an array of objects.

~~~
////
export class AppComponent {
	courses = [
		{ id: 1, name: 'course1'},
		{ id: 2, name: 'course2'},
		{ id: 3, name: 'course3'}
	]
}
~~~

Now er use the ngFor directive to render in the view.

~~~
<ul>
	<li *ngFor="let course of courses">
		{{ course.name }}
	</li>
</ul>

~~~

If you would like to display an exported value such as index we get the value of index and se it as a local variable called i then use interpolation to print it out.

~~~
<ul>
	<li *ngFor="let course of courses; index as i">
		{{ i }} - {{ course.name }}
	</li>
</ul>
~~~

If you want to render all the even values, we access the value then alias it as a local variable.

~~~
<ul>
	<li *ngFor="let course of courses; even as isEven">
		{{ course.name }} <span> Even </span>
	</li>
</ul>
~~~

To find a list of all exported values check out this website - https://angular.io/api/common/NgForOfContext

###ngFor and change Detection

Angular is a change detection mechanism, so whenevr we click a button, recieve an ajax request or triggered by a timer, angular perfoms its change dtection.

Use click event to bind to a method to create a new course
~~~
<button (click)="onAdd()">Add</button>
<ul>
	<li *ngFor="let course of courses">
		{{ course.name }}
	</li>
</ul>
~~~
>app.component.html

create the method that pushes a new course into the array.
~~~
////
export class AppComponent {
	courses = [
		{ id: 1, name: 'course1'},
		{ id: 2, name: 'course2'},
		{ id: 3, name: 'course3'}
	];

	onAdd() {
		this.courses.push({ id:4, name: 'course4' })
	}
}
~~~
>app.component.ts

Similarly we can add a button to remove it.
~~~
<button (click)="onAdd()">Add</button>
<ul>
	<li *ngFor="let course of courses">
		{{ course.name }}
		<button (click)="onRemove(course)">Remove</button>
	</li>
</ul>
~~~
>app.component.html

~~~
////
export class AppComponent {
	courses = [
		{ id: 1, name: 'course1'},
		{ id: 2, name: 'course2'},
		{ id: 3, name: 'course3'}
	];

	onAdd() {
		this.courses.push({ id:4, name: 'course4' })
	}
	onRemove(course){
		let index = this.courses.indexOf(course) //first get index of array
		this.courses.splice(index, 1); //we go into that index an delete that object.
	}
}
~~~
>app.component.ts

###ngFor and Trackby

if you are deaing with a large list and complex markup and you notice perfomance speed issues than the trackby feature ay be a solution to this issue would be trackby feature.

Each time when loading angular reconstructs the entire DOM object tree and this can be costly when dealing with large complex lists called from the backend.


Angular by default tracks object by their identity. When we are resetting the objects, even though we are dealing witht he exact same content, these objects will be differencet from their previous object in the memory. So angualr sees it as new conetnt so it reconstructs it as new objects.

ngfor lets us change the way we track objects as by default Angular tracks by object id. So instead by tracking by the identity or refernce in the memonry we want to track it by the id of the object.

~~~
<ul>
	<li *ngFor="let course of courses; trackBy: trackCourse">
		{{ course.name }}
	</li>
</ul>

~~~

to implementnthis method in our app.component.ts, this should take two parameters, the index and course.

~~~
////
export class AppComponent {
	courses = [
		{ id: 1, name: 'course1'},
		{ id: 2, name: 'course2'},
		{ id: 3, name: 'course3'}
	];

	trackCourse(index, course) {
		return course ? course.id : undefined;
	}

}
~~~

Here weve chnaged how angualr tracks objects - instead of their identity we track by their id.

#####The leading asterisk

We are telling angular to rewrite the div into a ng-template.
From this -

~~~
<div *ngIf="courses.lenght > 0; else noCourses">
	List of courses
</div>
<ng-template>
	No courses
</ng-template>
~~~

It will create a new ng-template, apply ngif as property binding on to the ng-template and bind it to the expression and for the esle it will apply simlar property binding on the ng-template.

~~~
<div *ngIf="courses.lenght > 0; else noCourses">
	List of courses
</div>
<ng-template [ngIf]="courses.length > 0">
	<div>
		List of courses
	</div>
</ng-template>

<ng-template [ngIf]="!(courses.length > 0)">
	No courses
</ng-template>
~~~

We can do this ourselves but it saves time letting angualr do this.

##### ngClass

When dealing with multiple classes, ngClass gives us the ability to refactor and make code much cleaner.

~~~
<span
	class="glyphicon"
	[class.glyphicon-star]="isSelected"
	[class.glyphicon-star-empty]="!isSelected"
	(click)="onClick()"
	></span>
~~~

This is done by binding ngClass to an expression and create objects that has one or more key value pairs. Each key represents a css class and the value determines if the style is rendred or not.

~~~
<span
	class="glyphicon"
	[ngClass]="{
		'glyphicon-star': isSelected,
		'glyphicon-star-empty: '!isSelected
	}"
	(click)="onClick()"
	></span>
~~~

This directive is an example of arrtibute directive. It is used ot modify an element within the DOM

####ngStyle

Similar to the ngClass directive, the ngStyle directive enables us to clean up noisy code when delaing wtih several style bindings.

~~~
<button 
	[style.backgourndColor]="canSave ? 'blue': 'grey'"
	[style.color]="canSave ? 'white': 'black'"
	[style.fontWeight]="canSave ? 'bold': 'normal'"
>
Save
</button>
~~~

Using property binding syntax and bind ngStyle to an expression. We then create an object with key value pairs.

~~~
<button 
	[ngStyle]="{
		'backgourndColor': canSave ? 'blue': 'grey',
		'style.color': canSave ? 'white': 'black',
		'style.fontWeight': canSave ? 'bold': 'normal'
>
Save
</button>
~~~


####Safe traversal Operator

When dealing with complex object it is possible that the value of a property may be null or undefined for a period of time. For example when calling objects fromdifferent endpoints from a server. Then for that period of time the property field may be null or undefined, this will potentailly cause an issue in the console 

~~~
cannot read property "__" of null
~~~

A solution to this would be using a ngIf to only render the span when its a truthy

~~~
<span *ngIf="task.assignee">{{ task.assignee.name }}</span>
~~~

Alternatively if we want to keep the span in the DOM but we don't want to render the property if it's null we can use Safe traversal Operator.

So because the assignee can be null or undefined we put a "?" before it. 

~~~
<span {{ task.assignee?.name }}</span>
~~~

If it's null or undefined it will be ignored or else it the name will be returned.


###custome directives

To have control over behaviour of the DOM elements we can create custome directives.

To implement directives, we can create it from scratch or we can use angular cli to generate the directive component.

~~~
ng g d input-format
~~~

As well as creating files it modifies the app.module file.

Inside the input-format.directive.ts we can see the similarities it shares with a normal component.
We import the declarator function <strong>HostListener</strong> which let's us subscribe to events raised from the DOM elements (the dom element that has this arttribute)

~~~
import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[appInputFormat]'
})

export class InputFormatDirective {
	
	constructor() {
	
	}

}

~~~

Firstly we get the value of the inputy field. First we need a refernce of our host element, so inside our constructor we need to inject an element refernce object.
<strong>ElementRef</strong> is a service in angualr that gives us access to a DOM object.

~~~
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[appInputFormat]'
})

export class InputFormatDirective {
	constructor(private el: ElementRef) { }
	@HostListener('blur') onBlur(){
		
	}
	

}

~~~

Now on the onBlur() method, we need to read the value of the input field first and access the native element property - giving us access to the actual DOM object. Using type annottation we can access all the methd defined in the string class


~~~
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[appInputFormat]'
})

export class InputFormatDirective {
	constructor(private el: ElementRef) { }
	@HostListener('blur') onBlur(){
	
		let value: string = this.el.nativeElement.value;
		this.el.nativeElement.value = value.toLowercase();
		
	}
	

}
~~~

Back on the app.component.html

~~~
<input type="text" appInputFormat>
~~~

If we wanted to add more flexiblity and customisation in the input field, we can define a field and mark it as a input property. 

~~~
<input type="text" appInputFormat [format] = "'uppercase'">
~~~

Inside the input-format.directive.ts we define the new field and delcart it with a <strong> @input()</strong> then import it form our angualr/core.


~~~
import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appInputFormat]'
})

export class InputFormatDirective {
	@Input('format') format;
	
	constructor(private el: ElementRef) { }
	
	@HostListener('blur') onBlur(){
	
		let value: string = this.el.nativeElement.value;
		
		if (this.format == 'lowercase')
			this.el.nativeElement.value = value.toLowercase();
		else
			this.el.nativeElement.value = value.toUppercase();
		
	}	

}
~~~

We have to apply this 'appInputFormat' directive as an attribute and then use property binding to set the target 'format'.
Since we only have one input property, it would be cleaner to set the target format whilet applying the directive as an attribute 

~~~
<input type="text" [appInputFormat]="'uppercase'">
~~~

to implment this we change the format to the sleecetor of our directives in out directives.

~~~
//////

export class InputFormatDirective {
	@Input('appInputFormat') format;
	
	constructor(private el: ElementRef) { }
	
	@HostListener('blur') onBlur(){
	
	//////
	

~~~






