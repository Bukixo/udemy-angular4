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
		<textarea id="comment type="text" class"form-control">
	</div>
</form>
~~~


In the contact-form.component.ts we clean up the selector

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
Inside app.component.html, we add the contact form selector.

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

So for each input field we need a control object.

#### Form Group

Form group is another class which represents a group of controls of a form.
All the controls are also available in the group which returns true if they are all valid in control. 

#### Difference between template - driven forms and reactive forms in terms of creating control objects

Reactive 

- More control over validation logic
- Good for complex forms
- Unit test validation logic

Template-driven

- Good for simple forms
- Simple validation
- Easier to create
- Less code
 

#### ngModel for validation

When we apply the ngModel Directive along with the name attribute in the input field, Angular automatically creates an instance of the form control class and associates it with the input field

~~~
<form>
	<div class="form-group">
		<label for="firstName"> First name</label>
		<input ngModel name="firstName" #firstName="ngModel" id="firstName" type="text" class"form-control">
	</div>
	<div class="form-group">
		<label for="comment"> Comment</label>
		<textarea ngModel name="comment" id="comment type="text" class"form-control">
	</div>
</form>
~~~


#### Adding validation

Firstly we make it required to add validation. Inside the div we display the validation error. We only want to display it if the input field is valid. We then reference our template variable to 'firstName.valid'.

~~~
<form>
	<div class="form-group">
		<label for="firstName"> First name</label>
		<input required ngModel name="firstName" #firstName="ngModel" id="firstName" type="text" class"form-control">
		<div class ="alert alert-danger" *ngIf="!firstName.valid">first name required.</div>
	</div>
	<div class="form-group">
		<label for="comment"> Comment</label>
		<textarea ngModel name="comment" id="comment type="text" class"form-control">
	</div>
</form>
~~~

To only render the div if the user has touched has the input field then has left the input field without entering a value

~~~
<form>
	/////////
		<input required ngModel name="firstName" #firstName="ngModel" id="firstName" type="text" class"form-control">
		<div class="alert alert-danger" *ngIf="!firstName.touched && !firstName.valid">first name required.</div>
	///////////
~~~
 

#### Specific validations

Angular has a few inbuilt validations, for instance we can set min length, max length, pattern (regex).

~~~
<form>
	/////////
		<input required minlength="3" maxlength="10" pattern="apple" ngModel name="firstName" #firstName="ngModel" id="firstName" type="text" class"form-control">
		<div class="alert alert-danger" *ngIf="!firstName.touched && !firstName.valid">first name required.</div>
	///////////
~~~

When we have multiple validations we create seperate divs to displays the errors.

~~~
<form>
	/////////
		<input required minlength="3" maxlength="10" pattern="apple" ngModel name="firstName" #firstName="ngModel" id="firstName" type="text" class"form-control">
		<div class="alert alert-danger" *ngIf="!firstName.touched && !firstName.valid">
			<div *ngIf="firstName.errors.required"> First Name is required</div>
			<div *ngIf="firstName.errors.minlength">First name should be a minimum of {{ firstName.error.minlength.requiredlength }} characters</div>
			<div *ngIf="firstName.errors.pattern">First name should match pattern</div>
		</div>
	///////////
~~~


#### Styling Invalid Inout Fields

To add styling to the invalid field, we use the inspection tool inside the browser to pick up the class when it's displaying the error.  

~~~
class = "form-control ng-invalid ng-dirty ng-touched
~~~

So inside the  our style.css we use that class to apply the styling

~~~
.form-control.ng-touched.ng-invalid {
	 border: 2px solid red;
}
~~~

#### Cleaner Templates 

An example to clean the code structure

~~~
<form>
	/////////
		<input 
			required 
			minlength="3" 
			maxlength="10" 
			pattern="apple" 
			ngModel 
			name="firstName" 
			#firstName="ngModel" 
			id="firstName" 
			type="text" 
			class"form-control">
		<div 
			class="alert alert-danger" 
			*ngIf="!firstName.touched && !firstName.valid">
			<div *ngIf="firstName.errors.required">
			 	First Name is required
			 </div>
			<div *ngIf="firstName.errors.minlength">
				First name should be a minimum of {{ firstName.error.minlength.requiredlength }} characters
			</div>
			<div *ngIf="firstName.errors.pattern">
				First name should match pattern
			</div>
		</div>
	///////////
~~~

#### ngForm

Angular by default attaches a directive called ngForm.

We can create a template variable to reference the ngform.
In the documentation we see that the directive has a output property which is used to raise events. So It can be used in event binding.

~~~
<form #f="ngForm" (ngSubmit)="submit(f)">
	/////////
		<input 
			required 
			minlength="3" 
	///////////
~~~

Inside the contact-form.component.html we create the method.

~~~

/////
 export class ContactFormComponent {
	 log(x) { console.log(x); }

	 submit(f) {
		 console.log(f)
	 }
 }