# Building reusable components

In order to make components reusable, we apply input and output properties.
Inputs are used to pass a state and Outputs raise events. The combination of both the input and output of a component make up the component api.

## Input properties

To make components more reusable

~~~
import { Component, OnInit } from '@angualr/core';

@Component({
	selector: 'favorite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent implements OnInit {
	isFavorite: boolean; 	
	constructor() {}

	ngOnInit() {
	}

	onClick() {
		this.isFavorite = !this.isFavorite;
	}

	}
~~~
>~~~
isFavorite: boolean;
~~~
We mark it as an input property so we can use it as a property binding expression in app.component.html.

~~~
<favorite [isFavorite]="post.isFavorite"><favourite>
~~~

Firstly we need to a declartor function from the Angular core libary called <strong>@Input()</strong> which we call like a function.

<strong>@Input()</strong> is another Angular declarator used to mark fields as input properties.

~~~
import { Component, OnInit, Input } from '@angualr/core';

@Component({
	selector: 'favorite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent implements OnInit {
	@Input() isFavorite: boolean; 	
	constructor() {}
	//////////
~~~

Now <strong>isFavourite</strong> can be binded outside it's component.
This is how we define input properties.


### Aliasing Input Properties

There are two benefits of using alias' for input fields.
Firstly, we are able to rename fields in a way that would usually not be valid in javascript for example 'is-favourite' as opposed to the standard camel case of 'isFavourite'

Secondly, it minimizes the occurance of bugs. For instance if we were to make a name change to the input field it could cause the app to break unless the alias inside the '@Input()' is still in line with the component inside the html.

##### To add an alias to the property

Inside the <strong>favorite.component.ts</strong> we add the alias inside the <strong>@Input()</strong>

~~~
import { Component, OnInit, Input } from '@angualr/core';

@Component({
	selector: 'favorite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent implements OnInit {
	@Input(is-favorite) isFavorite: boolean; ///add alias inside brackets
	constructor() {}
	//////////
~~~

In the frontend we would then change it to -

~~~
<favorite [is-favorite]="post.isFavorite"><favourite>
~~~

When updating fields, the templates will not update so that has to be manually changed.


## Output Properties

Now we want a this component to raise a custom events like 'change' that we can bind to our method in our host component. And this method will be called whenever our favorite component raises the change.

~~~
<favorite [is-favorite]="post.isFavorite" (change)= "onFavoriteChanged()"><favourite>
~~~

Inside the app.component.ts we add our functions

~~~
export class AppComponent {
	post = {
		title: "Title",
		isFavorite: true
	}

	onFavouriteChanged() {
		console.log('favourite changed!')
	}

~~~

Back in the template we need to extent the output component so it raises a change. This is done by declaring an output property.

Creating output properties is similar to creating input fields. This time we declare <strong>@Output()</strong>.

~~~
import { Component, OnInit, Input, Output, EventEmitter } from '@angualr/core';

@Component({
	selector: 'favorite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent implements OnInit {
	@Input('is-Favorite') isSelected: boolean;
	@Output() change = new EventEmitter(); 	constructor() {}

	ngOnInit() {
	}

	onClick() {
		this.isSelected = !this.isSelected;
		this.change.emit
	}

	}
~~~
>The name of the field should be exactly be the same as whats on the html which in this case is change
>We use event emitter to emit custom events. It is used to raise or publish an event - notifies others an event took place.

## Passing data

To pass data when raising events we can either add values or objects which is will be available to all the subscribers of the event which is our app.component.

To add a value we go back on to favourite.component.ts  

~~~
///////////

	onClick() {
		this.isSelected = !this.isSelected;
		this.change.emit(this.selected)
	}

	}
~~~

We pass an argument to the emit method which would display a simple boolean value.
Next in app.component.ts, we update the function by adding a parameter and displaying it in the console.

~~~
export class AppComponent {
	post = {
		title: "Title",
		isFavorite: true
	}

	onFavouriteChanged(isFavorite) {
		console.log('favourite changed!: ', isFavorite)
	}

~~~

The last step would be in the app.component.html.
When handling the change event we add the <strong>$event</strong>. This $event will be anything we pass.

~~~
<favorite [is-favorite]="post.isFavorite" (change)= "onFavoriteChanged($event)"><favourite>
~~~

>in the console log we should see a true or false

For more complex data passing we can make use of objects which can have a property.

~~~
///////////

	onClick() {
		this.isSelected = !this.isSelected;
		this.change.emit({ newValue: this.isSelected })
	}

	}
~~~

Back in app.component.html, now the <strong>$event</strong> represents the object that has a property called newValue. Inside the app.component.ts we can change the argument to <strong>eventArgs</strong> - argument passed with an event.

~~~
export class AppComponent {
	post = {
		title: "Title",
		isFavorite: true
	}

	onFavouriteChanged(eventsArgs) {
		console.log('favourite changed!: ', eventArgs)
	}
~~~

When working with more complex implementations we can apply type annotations so that you will be able to access compiled time and intelisense.
~~~
export class AppComponent {
	post = {
		title: "Title",
		isFavorite: true
	}

	onFavouriteChanged(eventsArgs: FavoriteChangedEventArgs ) {
		console.log('favourite changed!: ', eventArgs)
	}
~~~

Then we create an interface that defines the type of argument of the change event. To build reusable components, we then import this interface in to our implementation and export it from our module. at this point any consumers will be able to import it from our module. Therefore, inside our favorite.components.ts we add and export our interface.

~~~
import { Component, OnInit, Input, Output, EventEmitter } from '@angualr/core';

@Component({
	selector: 'favorite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent implements OnInit {
	@Input('is-Favorite') isSelected: boolean;
	@Output() change = new EventEmitter(); 	constructor() {}

	ngOnInit() {
	}

	onClick() {
		this.isSelected = !this.isSelected;
		this.change.emit
	}

export interface FavoriteChangedEventArgs {
	newValue: boolean

}
	}
~~~

And inside our app.component.ts we import our interface

~~~
Import { interface FavoriteChangedEventArgs } from './favorite.components.ts';
~~~

## Aliasing on Output properties

Likewise with the input we can also add an alias into our output properties.

~~~
import { Component, OnInit, Input, Output, EventEmitter } from '@angualr/core';

@Component({
	selector: 'favorite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent implements OnInit {
	@Input('is-Favorite') isSelected: boolean;
	@Output('change') click = new EventEmitter(); 	constructor() {}

///////
~~~

We use alias to keep the api of our component stable.

## View encapsulation

Angular creates a scope so our styles do not leak outside our components.

<strong>Shadow DOM</strong> allows to apply scoped styles to elements without bleeding out to the outer world.
With the view Encapsulation, the 'Emulated' option emulates the shadow dom.

~~~
import { Component, OnInit, Input, Output, EventEmitter } from '@angualr/core';

@Component({
	selector: 'favorite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favorite.component.css'],
	encapsulation: View.Encapsulation.Emulated
})

////////
~~~


## ng-Content

If you are building reusable components and you want the consumer of the component to be able provide custom content we use the ng-content

~~~
div.panel.panel-default>div.panel-heading+div.panel-body
~~~

>Writing it out like the above creates what's below

~~~
<div class="panel panel-default">
  <div class="panel-heading"></div>
  <div class="panel-body"></div>
</div>
~~~

>Provides a bootstrap panel.

Now in order to make it more dynamic we add the ng-conent element in the panel.component.html

~~~
<div class="panel panel-default">
  <div class="panel-heading">
  	<ng-content select=".heading"></ng-content>
  </div>
  <div class="panel-body">
  	<ng-content select=".body"></ng-content
  </div>
</div>
~~~

Here in the app.component.html we can provide custom content to our reusable components

~~~
<boostrap-panel>
	<div class="heading">Heading</div>
	<div class="body">
		<h2>Body</h2>
		<p>Some content</p>
	</div>
</bootstrap-panel>
~~~

## ng-Container

To gain the same outcome with less the noise that comes with ng-content and also wanting the option of not adding an element inside the div, then ng-container may be a better option.

~~~
<boostrap-panel>
	<ng-container class="heading">Heading</ng-container>
	<div class="body">
		<h2>Body</h2>
		<p>Some content</p>
	</div>
</bootstrap-panel>
~~~
>app.component.html

Therefore inside the panel.component.html we can refactor the div to just 'Heading'

~~~
<boostrap-panel>
	Heading
	<div class="body">
		<h2>Body</h2>
		<p>Some content</p>
	</div>
</bootstrap-panel>
~~~

At runtime Angular will only take in the content of the ng-container.
