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