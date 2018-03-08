## Building resuable components

In order to make a component reusable, we apply input and output properties.
Input is used to pass a state and Outputs raise events. The combination of both the input and output of a component makes up the component api.

### Input properties

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
We wants to mark it as an input property so we can use it in property binding expression in app.component.html.

~~~
<favorite [isFavorite]="post.isFavorite"><favourite>
~~~

Firstly we need to declarator function from the Angular core libary called <strong>@Input()</strong> which we call like a function. 

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

There are two benefits of using alias's for input fields.
Firstly, we are able to rename fields in a way that would usually not be valid in javascript for example 'is-favourite' as opposed to the standard camel case of 'isFavourite'

Secondly, it minimizes the occurance of bugs. For instance if we were to make a name change to the input field it could cause the app to break unless the alias inside the '@Input()' is still in line with the component inside the html.

####To add an alias to the property

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


### Output Properties

Now we want a this component to raise a custom event like 'change' that we can bind to our method in our host component. And this methid will be called whenever our favorite component raises the change.

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

Creating output properties is similar to cretaing input fields. This time we declare <strong>@Output()</strong>.

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
>The name of the field should be exactly the same as whats on the html which in this case is change	
>When use an event emitter to emit custom events. It is used to raise or pusblish an event - notifies others an event took place.

###Passing data

To pass data when raising events we can either add values or objects which is will be available to all this subscribers of this event which is our app.component.

To add a value we go back on to favourite.component.ts  

~~~
///////////
	
	onClick() {
		this.isSelected = !this.isSelected;
		this.change.emit(this.selected)
	}
	
	}
~~~

We pass an agrugemtn to the emit method which would displays a simple boolean value.
Next we app.component.ts and update the function by adding a parameter and displaying it in the console.

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

The last step would be going on the app.component.html.
When handling the change event we add the <strong>$event</strong>. This $event will be anything we pass/

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

Back in app.component.html, now the <strong>$event</strong> now then represents the object that has a property called newValue. Inside the app.component.ts we can change the arguement to <strong>eventArgs</strong> - arguement passed with an event.

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

When working with more complex implementations where you would like to apply type annotations so that you will be able to access compiled time and intelisense, we can add type annotations.

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

Then we define an interface that defines the type of agruement of the change event. To build reusable components, we would then want to import this interface in our implentation and export it from our module and any consumers will be able to import it from our module. Therefore inside our favorite.components.ts we add and export our interface

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
