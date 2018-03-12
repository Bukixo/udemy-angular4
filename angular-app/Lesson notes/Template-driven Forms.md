## Template Driven forms

### Building a boostrap form

First we generate a new component

~~~
ng g c contact-form
~~~

In the contact-form.html we add the markup. 

~~~
<form>
	<div class="form-group">
		<label for="firstName"> First name</label>
		<input id="firstName" type="text" class"form-control">
	</div>
	<div class="form-group">
		<label for="comment"> Comment</label>
		<textarea id="fcomment type="text" class"form-control">
	</div>
</form>
~~~


In the contact-form.component.ts we clean the selector

~~~
@Component({
	selector: 'app-selector-form',
	
/////

From that to this

@Component({
	selector: 'selector-form',
	
/////

~~~
Removing the app as it's extra noise. Unless the name clashes with another selector.
Inside out app.component.html, we add the contact form selector.

~~~
<contact-form></contact-form>
~~~

### Types of forms

#### Form Control

We have a class control for each input of a form we need to create an instance of the control with that we check 

- current value stored in a field
- touched
- untouched
- dirty
- pristine
- valid
- erros

So for each inout field we need a control object.

#### Form Group

Form group is another class which represents a group of controls of a form.
All teh conrrolls are also availabole in the group which on returns true id they are all valid in control. 

#### Difference between template - drien forms and reactive forms in terms of creating control objects

Reactive 

- More control over validation logic
- Good for complex forms
- Unit test vloafdation logic

Template-driven

- Good for simple forms
- Simplae validation
- Easier to create
- Less code
 

#### ngModel for validation

When we apply the ngModel Directive along with the name attirbute in the input  field angular automatically creates an instance f=of rhte form control class and associates it with the input field

~~~
<form>
	<div class="form-group">
		<label for="firstName"> First name</label>
		<input id="firstName" type="text" class"form-control">
	</div>
	<div class="form-group">
		<label for="comment"> Comment</label>
		<textarea id="fcomment type="text" class"form-control">
	</div>
</form>
~~~





 



