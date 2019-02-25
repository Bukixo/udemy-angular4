Implement a login


When a user logs in we should post api to and endpoint to validate their credentials. If valud we should a json web token and store in local storage and return in using a boolean rather than a repsonse.

~~~
//auth.services.ts

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/opertor/map';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
   return this.http.post('/api/authenticate',
      JSON.stringify(credentials));
      .map(response => {
        console.log(response.json())
      });
  }

  logout() {
  }

  isLoggedIn() {
    return false;
  }
}
~~~

And inide our login.component.ts we have an if statement connected to our boolean that either redirects to the or throws an error sign if the invalid login is true

~~~
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.invalidLogin = true;
        }
      });
  }
}
~~~

##implement a logout

As we can see in our home.html, this is where we would like im implement our logout button

~~~
<ul>
  <li><a routerLink="/admin">Admin</a></li>
  <li><a routerLink="/login">Login</a></li>
  <li><a>Logout</a></li>
</ul>
~~~

Going back to out home.component.ts, we injected teh auth service inside this component and wiht this we go back into the home.html and bind the auth service into out link

~~~
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService) { }
}

~~~

Inside our home.component.html

~~~
<ul>
  <li><a routerLink="/admin">Admin</a></li>
  <li><a routerLink="/login">Login</a></li>
  <li><a (click)="authService.logout()">Logout</a></li>
</ul>
~~~

To implement this methods we go into our services and add the logic into out logout method.

~~~
  logout() {
   
  }
~~~

The way to make the logout work is by removing the token from the local storage becaus ethe existnce of a valid token means we have an existing user.

~~~
 logout() {
    localStorage.removeItem('token')
  }
~~~

### Showing and hiding elements

~~~
npm install angular2-jwt --save
~~~


~~~
auth.services.ts

import { JwtHelper } from 'angular2-jwt'
import { Injectable } from '@angular/core';
////

  isLoggedIn() {
    const jwtHelper = new JwtHelper();
    return false;
  }
}

~~~

~~~
  isLoggedIn() {
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    const expirationDate = jwtHelper.getTokenExpirationDate(token);
    const isExpired = jwtHelper.isTokenExpired(token);

    console.log('Expiration', expirationDate );
    console.log('isExpired', isExpired);
    return false;
  }
}
~~~

~~~
home.component.html

<ul>
  <li *ngIf='authService.isLoggedIn()'><a routerLink="/admin">Admin</a></li>
  <li><a routerLink="/login">Login</a></li>
  <li><a (click)="authService.logout()">Logout</a></li>
</ul>

~~~

~~~
 isLoggedIn() {
    return tokenNotExpired();
    // const jwtHelper = new JwtHelper();
    // const token = localStorage.getItem('token');
    // const expirationDate = jwtHelper.getTokenExpirationDate(token);
    // const isExpired = jwtHelper.isTokenExpired(token);

    // console.log('Expiration', expirationDate );
    // console.log('isExpired', isExpired);
    // return false;
  }
}
~~~

~~~
<ul>
  <li *ngIf='authService.isLoggedIn()'><a routerLink="/admin">Admin</a></li>
  <li *ngIf='!authService.isLoggedIn()'><a routerLink="/login">Login</a></li>
  <li *ngIf='authService.isLoggedIn()'><a (click)="authService.logout()">Logout</a></li>
</ul>
~~~

