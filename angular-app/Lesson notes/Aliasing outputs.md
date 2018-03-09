### Aliasing on Output properties

Likewise with the input we can also add an alias into our output properties too.

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

We use alias to keep the api of our component stable.

### View encapsulation

Angular creates a scope so our styles do not leak outside our components.

<strong>Shadow DOM</strong> allows to apply scoped styles to elements without bleeding out to the outer world.
With the wiew Encapsulation, the 'Emulated' which emulates the shadow dom.

~~~
import { Component, OnInit, Input, Output, EventEmitter } from '@angualr/core';

@Component({
	selector: 'favorite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favorite.component.css'],
	encapsulation: View.Encapsulation.Emulated
})

export class FavoriteComponent {
	@Input('is-Favorite') isSelected: boolean; 
	@Output('change') click = new EventEmitter(); 
		
	onClick() {
		this.isSelected = !this.isSelected;
		this.change.emit
	}
	
export interface FavoriteChangedEventArgs {
	newValue: boolean
	
} 
	}
~~~


###ng-Content

If you are building reusable components and you want the consumer of the component to be able provide custom content we use the ng-content

~~~
div.panel.panel-default>div.panel-heading+div.panel-body
~~~

>Writing out this like the above leaves gives you whats below

~~~
<div class="panel panel-default">
  <div class="panel-heading"></div>
  <div class="panel-body"></div>
</div>
~~~

>Gives us a nice a bootstarp panel.

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

###ng-Container

To gain the same outcome with the noise that comes with ng-content and want the option of not adding an element inside the div, then ng-container may be a better option.

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

At runtime angualr will only take in the content of the ng-container.

