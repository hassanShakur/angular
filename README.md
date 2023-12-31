# Angular

## Basics

Initialize a component using:

```sh
ng g c componentName
```

A directive:

```sh
ng g d directive-name
```

### Data Binding

1. String Interpolation

   In your `ts` component:

   ```ts
   export class MyComponent {
     myData = "Component data";
   }
   ```

   then in `html` template:

   ```html
   <p>Data from ts file: {{ myData }}</p>
   ```

2. Property Binding - Add a counter

   In the `ts`:

   ```ts
   export class MyCounterComponent {
     counter = 0;

     constructor() {
       this.startCounter();
     }

     startCounter() {
       setInterval(() => {
         this.counter++;
       }, 1000);
     }
   }
   ```

   In the `html`:

   ```html
   <p [innerText]="counter"></p>
   ```

3. Event Binding

   In the `ts`:

   ```ts
   export class CounterComponent {
     counter = 0;
     intervalId: any;

     startCounter() {
       this.intervalId = setInterval(() => {
         this.counter++;
       }, 1000);
     }

     stopCounter() {
       clearInterval(this.intervalId);
     }
   }
   ```

   In the `html`:

   ```html
   <button (click)="startCounter()">Start counter</button>
   <button (click)="stopCounter()">Stop counter</button>
   <p [innerText]="counter"></p>
   ```

4. Two Way Binding

   For this ensure in the `app.module.ts`, `FormsModule` is imported:

   ```ts
   import { FormsModule } from "@angular/forms";

   // And later
   imports: [
     BrowserModule,
     FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
   ];
   ```

   In the `ts`:

   ```ts
   export class MyComponent {
     myEmail = "a@b.c";
   }
   ```

   Then in the `html`:

   ```html
   <input type="email" id="email" [(ngModel)]="myEmail" />
   <p>You entered: {{ myEmail }}</p>
   ```

### Directives

These are kind of instructions to do a piece of task. Eg for conditional rendering:
In `html`:

#### Structural - They change the DOM

1. \*ngIf

   ```html
   <button (click)="toggle()">Toggle state</button>
   <p *ngIf="visible">State on</p>
   <p *ngIf="!visible">State off</p>
   ```

   Or:

   ```html
   <button (click)="isVisible = !isVisible">Toggle state</button>
   <p *ngIf="isVisible; else offState">State on</p>
   <ng-template #offState>
     <p>State off</p>
   </ng-template>
   ```

   And `ts`:

   ```ts
   export class MyComponent {
     isVisible = false;
   }
   ```

2. \*ngFor

   ```html
   <ul>
     <li *ngFor="let item of myList; let i = index">{{ i }}. {{ item }}</li>
   </ul>
   ```

3. ngContent

   Enables rendering of html passed between a component's selector from the component itself at a specified location:

   In parent `html`:

   ```html
   <app-child>
     <p>Content beween child tags</p>
   </app-child>
   ```

   In child `html`:

   ```html
   <div>
     <p>Child component</p>
     <ng-content></ng-content>
   </div>
   ```

4. ngSwitch

   Offers the `switch-case` logic. Suppose the component has a `val` attribute:

   ```html
   <div [ngSwitch]="val">
     <p *ngSwitchCase="1">Val is 1</p>
     <p *ngSwitchCase="2">Val is 2</p>
     <p *ngSwitchCase="3">Val is 3</p>
     <p *ngSwitchDefault>Val is 5</p>
   </div>
   ```

#### Attribute Directives - Don't add or remove elements

Used to add properties to the `html`: eg `ngClass` & `ngStyle`.

```html
<!-- Adding style -->
<p [ngStyle]="{backgroundColor: isActive ? 'green' : 'red'}"></p>

<!-- Adding classes => className: condition -->
<p [ngClass]="{active: isActive === true}"></p>
```

### Components Data Sharing

1. Parent - Child Sharing

   In parent component:

   - `ts`:

     ```ts
     export class ParentComponent {
       parentData = "Some parent data";
     }
     ```

   - `html`:

     ```html
     <app-child [pData]="parentData"></app-child>
     ```

   In child component (with selector 'app-child'):

   - `ts`:

     ```ts
     export class ChildComponent {
       // Here the 'pData' is an alias that allows this property to be called this way outside this component when binding. But inside this component it is 'parentData'

       @Input("pData") parentData: string | undefined;
     }
     ```

   - `html`:

     ```html
     <p>{{ parentData }} from child!</p>
     ```

2. Child - Parent Sharing

   In child component:

   - `ts`:

     ```ts
     export class ChildComponent {
       @Output() createChildData = new EventEmitter<string>();

       constructor() {
         setTimeout(() => {
           this.createChildData.emit("Data from child");
         }, 2000);
       }
     }
     ```

   - `html`:

     ```html
     <p>child component!</p>
     ```

   In parent component:

   - `ts`:

     ```ts
     export class ParentComponent {
       kidData = "";

       childDataCreated(kidData: string) {
         this.kidData = kidData;
       }
     }
     ```

   - `html`:

     ```html
     <app-child (createChildData)="childDataCreated($event)"></app-child>
     <p>{{kidData}} from parent</p>
     ```

### View Encapsulation

This is where angular adds unique attributes to each component elements so styles used by that component only affect the component itself. You can disable this default behaviour in through:

```ts
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  // ... Other settings
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
```

### Creating Basic Directives

#### Attribute Directives

1. Using an ElementRef

   In this example I'll just add some styling to the target element.
   In a component folder to use the directive, or anywhere really:

   In the file: `fileName.directive.ts`:

   ```ts
   import { Directive, ElementRef } from "@angular/core";

   @Directive({
     // Name to be called to activate the directive => In this case, attribute seletor
     selector: "[sampleDirective]",
   })
   class SampleDirective {
     constructor(private targetEl: ElementRef) {
       targetEl.nativeElement.style.color = "red";
     }
   }

   export default SampleDirective;
   ```

   Remember to include it in the `app.module.ts`:

   ```ts
   @NgModule({
     declarations: [
       // Other components
       SampleDirective,
     ],
     // Other imports
   })
   export class AppModule {}
   ```

   Then in the `html` to apply directive:

   ```html
   <p sampleDirective>Directive styled!!!</p>
   ```

2. Using a Renderer

   The directive can also be made this way (Prefered version for DOM access):

   ```ts
   import { Directive, ElementRef, Renderer2 } from "@angular/core";

   @Directive({
     selector: "[sampleDirective]",
   })
   class SampleDirective {
     constructor(private targetEl: ElementRef, private renderer: Renderer2) {
       this.renderer.setStyle(this.targetEl.nativeElement, "color", "green");
     }
   }
   ```

3. Listening to DOM events - `@HostListener`

   The directives can also implement `HostListener`s.

   ```ts
   import { Directive, ElementRef, Renderer2, HostListener } from "@angular/core";

   class SampleDirective {
     constructor(private el: ElementRef, private renderer: Renderer2) {}

     @HostListener("mouseenter") mouseHasEnter(e: Event) {
       this.renderer.setStyle(this.el.nativeElement, "background-color", "green");
     }

     @HostListener("mouseleave") mouseHasLeft(e: Event) {
       this.renderer.setStyle(this.el.nativeElement, "background-color", "transparent");
     }
   }
   ```

4. Applying styles - `@HostBinding`

   ```ts
   class SampleDirective {
     @HostBinding("style.backgroundColor") bg: string = "white";

     @HostListener("mouseenter") mouseHasEnter(e: Event) {
       this.bg = "green";
     }

     @HostListener("mouseleave") mouseHasLeft(e: Event) {
       this.bg = "transparent";
     }
   }
   ```

#### Structural Directives

This example shows conditional template rendering. Start by creating the directive in a file say `only-when.directive.ts`:

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  // Property binding
  selector: "[appOnlyWhen]",
})
export class OnlyWhenDirective {
  // Use a setter
  @Input() set appOnlyWhen(condition: boolean) {
    if (condition) {
      // Add item to dom if condition is true
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // Destroy all views in the container binded to
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}
}
```

Then in the component to use it:

```ts
export class MyComponent {
  // Any condition
  display = true;
}
```

& html:

```html
<p *appOnlyWhen="display">I am visible only when display = true</p>
```

## Intermediate

### Component Lifecycle

Be sure to show that the component implements the lifecycle interface:

```ts
import { Component, OnInit } from "@angular/core";

@Component({
  // ...
})
export class MyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

1. ngOnChanges

   This is called when a bound input property (`@Input()`) changes. It is called before ngOnInit and whenever one or more data-bound input properties change.

   ```ts
   // import { SimpleChanges } from "@angular/core";
    ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
    }
   ```

2. ngOnInit

   This is called once the component is initialized. It is called after the first ngOnChanges.

   ```ts
   ngOnInit(): void {
     console.log("ngOnInit");
   }
   ```

3. ngDoCheck - This is called during every change detection run. It is called after ngOnChanges, ngOnInit, and any other DOM change detected by Angular.
4. ngAfterContentInit - This is called after Angular projects external content into the component's view, or into the view that a directive is in.
5. ngAfterContentChecked - This is called every time the projected content has been checked.
6. ngAfterViewInit - This is called after Angular initializes the component's views and child views, or the view that contains the directive. Before this, elements referenced in the component's template aren't yet available.
7. ngAfterViewChecked - This is called every time the view and child views have been checked.
8. ngOnDestroy - This is called once the component is about to be destroyed.

### Services

These are classes that can be used to share data between components. They are created using:

```sh
ng g s services/service-name
```

The service can look something like this - just like any other class:

```ts
import { Injectable } from "@anular/core";

@Injectable() // also enables injecting a service in another service
class ServiceNameService {}
```

They are added to the `app.module.ts`:

```ts
import { ServiceNameService } from "./services/service-name.service";

@NgModule({
  // ...
  providers: [ServiceNameService],
})
export class AppModule {}
```

Then in the component to use it:

```ts
import { ServiceNameService } from "./services/service-name.service";

export class MyComponent {
  constructor(private serviceName: ServiceNameService) {}
}
```

The `@Injectable()` decorator can be used in a service that uses a service in it (`injected`). This is done same as in components where you create a constructor that receives the service to be used as parameter. **The only catch is that to make a service injectable with another service, the service used to inject must be defined in the `providers` of the `app.module.ts`, otherwise it won't work.**

#### Cross Component Communication with Services

This can be done through emitting and subscribing to service events in the app. Say we have a messages service and we want to trigger a notification from one component and capture it in another.

In the `messages service`:

```ts
import { EventEmitter } from "@angular/core";

class MessagesService {
  notification = new EventEmitter<string>();
}
```

In component to `emit` the notification:

```ts
class EmitterComponent {
  constructor(private msgService: MessagesService){}

  // somewhere in a function
  this.msgService.notification.emit('Good morning')
}
```

Then in the `subscriber` component:

```ts
class ListenerComponent {
  constructor(private msgService: MessagesService){}

  // somewhere in a function
  this.msgService.notification.subscribe((msg: string)=>{
    // do something with the message
  })
}
```

### Routing

First create the routes and register them in the `app.module`:

```ts
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'about', component: AboutComponent },
];

@NgModules({
  imports: [
    // ...
    RouterModule.forRoot(appRoutes)
  ]
})
```

Create the location where the router is to inject the specified components in the routes:

```html
<!-- app.component.html -->
<app-header></app-header>
<router-outlet></router-outlet>
```

Finally create the links in the `header` component:

```html
<ul>
  <li routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
    <a routerLink="/">Home</a>
  </li>
  <li routerLinkActive="active"><a routerLink="/pricing">Pricing</a></li>
  <li routerLinkActive="active"><a routerLink="/about">About</a></li>
</ul>
```

**Note:** The `routerLinkActive` sets a class you specified to any link that is currently displayed by the router. Then the `[routerLinkActiveOptions]="{ exact: true }` is used to make the base route active only if the router is an exact match of only `/`.

#### Programmatic Navigation

In the component to trigger the navigation:

```ts
import { Router } from "@angular/router";

export class MyComponent {
  constructor(private router: Router) {}

  onGoToPricing() {
    this.router.navigate(["pricing"]); // the array can be used to add nested routes
  }
}
```

The navigator always moves relative to the `root`. To include relative programmatic navigation, do something like this:

```ts
export class MyComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onGoToPricing() {
    this.router.navigate(["pricing"], { relativeTo: this.route });
  }
}
```

#### Active Route Observation

Programmatic navigation from a route say `/users/:name1` to `/users/:name2` does not trigger the component rerendering. Therefore the specific component has to listen to these changes and update accordingly as below:

```ts
export class UserComponent implements OnInit {
  userName: string = "";
  constructor(private router: Router, private route: ActivatedRoute) {}

  // ensure you use an arrow function
  paramsObserver = (params: Params) => {
    this.userName = params["userName"];
  };

  ngOnInit(): void {
    // setting initia name from the route specified as 'users/:userName'
    this.userName = this.route.snapshot.params["userName"];
  }

  goToUser(name: string) {
    this.router.navigate(["users", name]);

    // active checking when the path changes
    this.route.params.subscribe(this.paramsObserver);
  }
}
```

Ensure the observer uses an arrow function due to how the `this` keyword works in different occasions. This approach is only necessary when component reload from the same page is possible. Otherwise you don't need to subscribe.

#### Query Params(?) & Fragments(#)

These can be set from the `html` or `ts`. Example, to navigate to `/home?auth=true#loading`, we could:

```html
<a routerLink="/home" [queryParams]="{auth: true}" fragment="loading">Some link</a>
```

or

```ts
this.router.navigate(["home"], {
  queryParams: { auth: true },
  fragment: "loading",
});
```

Then they can be accessed similar to the dynamic routes and also sibscribed to:

```ts
this.route.snapshot.queryParams;
this.route.snapshot.fragment;

// subscribe
this.route.queryParams.subscribe();
this.route.fragment.subscribe();
```

To conserve/still have the params and fragment in the url even after navigation, use the `queryParamsHandling`, which can either be set to `preserve` or `merge`:

```ts
this.router.navigate(["some/place"], { queryParamsHandling: "preserve" });
```

#### Nested Routes

Added using the `children` prop where routes are defined:

```ts
// in app.module.ts
const appRoutes: Routes = [
  { path: "users", component: UsersComponent, children: [
    path: ':id', component: UserComponent
  ] },
];
```

Remember to add an `outlet` for the router in the parent component for the nested routes.

#### Redirection & Wildcards

```ts
{ path: "404", component: NotFoundComponent }

// has to be the last route to handle all unhandled routes
{ path: "**", redirectTo: '/404' }
```

#### Route Protection with CanActivate and CanActivateChild Guards

This is a service that can be used to protect routes or child routes given a condition say if user is authenticated.

```ts
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(["/"]);
      }
    });
  }
}
```

Then in the `app.module.ts`:

```ts
import { AuthGuard } from "./auth-guard.service";

const appRoutes: Routes = [{ path: "users", canActivate: [AuthGuard] }];
```

#### Route Protection with CanDeactivate Guard

This is a service that can be used to protect routes from being left given a condition say if user has unsaved changes.

```ts
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
```

Then in the `app.module.ts`:

```ts
import { CanDeactivateGuard } from "./can-deactivate-guard.service";

const appRoutes: Routes = [{ path: "users", canDeactivate: [CanDeactivateGuard] }];
```

#### Passing Static Data to a Route

This can be done by adding a `data` prop to the route:

```ts
const appRoutes: Routes = [{ path: "users", component: UsersComponent, data: { message: "Hello" } }];
```

Then in the component, the data can be accessed through the `ActivatedRoute`:

```ts
import { ActivatedRoute } from "@angular/router";

class UsersComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data);
    });
  }
}
```

#### Resolving Dynamic Data with the resolve Guard

This is a service that can be used to resolve dynamic data before a route is loaded.

```ts
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

interface Person {
  id: number;
  name: string;,
}

class PersonResolver implements Resolve<Person> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Person> | Promise<Person> | Person {
    // logic to fetch the item
    return this.personService.getPerson(route.params['id']);
  }
}

```

Then in the `app.module.ts`:

```ts
import { PersonResolver } from "./person-resolver.service";

const appRoutes: Routes = [
  {
    path: "person/:id",
    component: PersonComponent,
    resolve: { person: PersonResolver },
  },
];
```

Then in the component, the data can be accessed through the `ActivatedRoute`:

```ts
import { ActivatedRoute } from "@angular/router";

class PersonComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((personData) => {
      console.log(personData);
    });
  }
}
```

### Observables

Brings in the `subscription` & `unsubscription` patterns. Let's create a custom one:

```ts
import { Observable } from "rxjs";

customObservable = new Observable((subscriber) => {
  let count = 0;
  subscriber.add(() => {
    console.log("Teardown called!");
  });
  setInterval(() => {
    subscriber.next(count++);

    if (count === 4) subscriber.error(new Error("Error, num is 4!"));
    if (count === 5) subscriber.complete();
  }, 1000);
  return subscriber;
}).subscribe(
  (data) => {
    console.log({ data });
  },
  (error) => {
    console.log({ error });
  },
  () => {
    console.log("Observable completed!");
  }
);
```

The `.add()` defines a `teardown` that is called whenever the subscriber completes, produces an error or resolves to a value - `data`, meaning it is always called at the end. Can be useful for some computations after data fetching is complete.
The `.error()` of course sends down an error to any subscriber and the `.complete()` clears and closes it.

The `.subscribe()` can take 3 callbacks, 1st for data on `.next()`, 2nd for error on `.error()`, and last for closing on `.complete()`.

#### Subjects

These can be thought as subs for event emitters whenever we are changing data in a `service`. Example:

```ts
import { Subject } from "rxjs";

class SomeService {
  // using event emiters
  myEventEmitter = new EventEmitter<boolean>();

  // using subjects
  mySubEmitter = new Subject<boolean>();
}
```

Instead of using `.emit()`, we now use `.next()` to trigger an event/pass data.

```ts
// using events
myEventEmitter.emit("data");

// using subjects
mySubEmitter.next("data");
```

Then to use it, do the normal subscription like any other observable. Always remember to cleanup any custom observables like this.

```ts
private activeSubscription: Subscription;

this.someService.mySubEmitter.subscribe((myBool) => {});

ngOnDestroy(): void {
  this.activeSubscription.unsubscribe()
}
```

### Forms

#### Template Driven Approach

Let's just look at the code:

```html
<form (ngSubmit)="onSubmit(myForm)" #myForm="ngForm">
  <div>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" ngModel />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" ngModel />
  </div>

  <button type="submit">Login</button>
</form>
```

`ngSubmit` points to a function that handles form submission. The `#myForm="ngForm"` is necessary to get hold of the form object that `angular` creates for you. All inputs you care about should have both the `name` prop as identifier and `ngModel` for angular to identify them.

Now we can have access to the form object in 2 ways, 1 during submission, and 2 using `@ViewChild()` at any point:

```ts
import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  // ...
})
export class MyComponent {
  @ViewChild("myForm") myForm!: NgForm;

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
```

The `@ViewChild()` can be used to access the form object at any point in the component. The `!` is used to tell typescript that the value will be available at runtime.

##### Form Validation

This can be done using the `required` attribute on the input:

```html
<input type="email" name="email" id="email" ngModel required #myEmail="ngModel" />
```

Then to show the error message, we can use the `ngModel` object:

```html
<p *ngIf="!myEmail.valid && myEmail.touched">Email is required!</p>
```

You can also add other angular validation attributes like `minlength`, `maxlength`, `pattern` etc, like:

```html
<input ngModel required email />
```

You can also use the `ngModel` to set a default value through property binding:

```html
<input [ngModel]="defaultEmail" />
```

There's also the `setValue()` and `patchValue()` methods that can be used to set the value of the form. The difference is that `setValue()` requires all the form fields to be set, while `patchValue()` can be used to set only a few fields.

```ts
// set all fields
myForm.setValue({
  email: 'a@b.c',
  password: '123,
})

// set only a few fields
myForm.form.patchValue({
  email: 'a@b.c'
})
```

You can also reset the form using the `reset()` method:

```ts
myForm.reset();
```

#### Reactive Approach

This is the preferred approach for large forms. It is also more flexible and powerful. It is also more testable.

```ts
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  // ...
})
export class MyComponent implements OnInit {
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    console.log(this.myForm);
  }
}
```

You then bind the form to the `html` using the `formGroup` and `formControlName` directives:

```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" formControlName="email" />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" formControlName="password" />
  </div>

  <button type="submit">Login</button>
</form>
```

**Note:** Remember to add the `ReactiveFormsModule` to the `app.module.ts`.

The `FormControl` takes 3 arguments, 1st is the default value, 2nd is an array of validators, and 3rd is an array of async validators. The `FormGroup` is used to group the form controls together.

Accessing controls in the `html`, use the `form.get()` method:

```html
<p *ngIf="!myForm.get('email')?.valid && myForm.get('email')?.touched">Email is required!</p>
```

Additionally, you can listen for status and value changes:

```ts
this.myForm.statusChanges.subscribe((status) => {
  console.log(status);
});

this.myForm.valueChanges.subscribe((value) => {
  console.log(value);
});
```

## Advanced

### Pipes

These are used to transform data in the `html` template. They can be used to transform data in a variety of ways, eg `uppercase`, `date` etc. They can also be used to create custom pipes. An example of say `uppercase`:

```html
<p>{{ myData | uppercase }}</p>
```

Read more about built-in pipes [here](https://angular.io/api?type=pipe).

#### Custom Pipes

Let's create a custom pipe to shorten a string:

```sh
ng g p pipes/pipe-name
```

**Note:** If you create the pipe manually, you have to add it to the `app.module.ts`:

```ts
import { PipeNamePipe } from "./pipes/pipe-name.pipe";

@NgModule({
  declarations: [
    // Other components
    PipeNamePipe,
  ],
  // Other imports
})
```

Then in the `pipe-name.pipe.ts`:

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten",
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + "...";
    }
    return value;
  }
}
```

Then in the `html`:

```html
<p>{{ myData | shorten: 10 }}</p>
```

#### Pure & Impure Pipes

Pure pipes are those that are only called when the input data changes. They are the default pipes. Impure pipes are those that are called even when the input data doesn't change. They are created by adding the `pure: false` prop to the `@Pipe` decorator:

```ts
@Pipe({
  name: "shorten",
  pure: false,
})
```

**Note:** Impure pipes can be expensive and should be used with caution.

#### Async Pipe

This is used to subscribe to observables in the `html` template. Example:

```ts
import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  // ...
})
export class MyComponent {
  myObservable = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next("Data from observable");
    }, 2000);
  });
}
```

Then in the `html`:

```html
<p>{{ myObservable | async }}</p>
```

### Http

This is used to make http requests to a server. It is used to fetch data:

```ts
import { HttpClient } from "@angular/common/http";

export class MyComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((data) => {
      console.log(data);
    });
  }
}
```

You can configure the http methods to infer the response type:

```ts
this.http.get<{ title: string; body: string }>("https://jsonplaceholder.typicode.com/posts").subscribe((data) => {
  console.log(data);
});
```

**Note:** Always consider extracting the http calls to a service.

#### Transforming Response Data

This can be done using the `pipe` method:

```ts
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export class MyComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .pipe(
        map((responseData) => {
          return responseData.map((post: any) => {
            return { title: post.title.toUpperCase(), body: post.body };
          });
        })
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
```

#### Error Handling

This can be done using the `pipe` method:

```ts
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export class MyComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .pipe(
        map((responseData) => {
          return responseData.map((post: any) => {
            return { title: post.title.toUpperCase(), body: post.body };
          });
        }),
        catchError((error) => {
          // do something with the error
          return throwError(error);
        })
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
```

You can also handle the errors via second callback in the `subscribe` method:

```ts
this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe(
  (data) => {
    console.log(data);
  },
  (error) => {
    // do something with the error
  }
);
```

#### Setting Headers & Query Params

This can be done by passing an object argument to the http methods:

```ts
this.http.get("https://jsonplaceholder.typicode.com/posts", {
  headers: new HttpHeaders({ "Custom-Header": "Hello" }),
  params: new HttpParams().set("userId", "1"),
});
```

You can also set the response type:

```ts
this.http.get("https://jsonplaceholder.typicode.com/posts", {
  responseType: "json",
});
```

#### Interceptors

These are used to intercept requests and responses to add some logic eg logging, adding auth headers etc. They are created using:

```sh
ng g interceptor interceptors/interceptor-name
```

Then in the `interceptor-name.interceptor.ts`:

```ts
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class InterceptorNameInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Request is on its way!");
    console.log(req.url);

    // modify the request
    const modifiedRequest = req.clone({ headers: req.headers.append("Auth", "xyz") });

    // return the modified request
    return next.handle(modifiedRequest).pipe(
      // modify the response
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log("Response arrived, body data:");
          console.log(event.body);
        }
      })
    );
  }
}
```

Then in the `app.module.ts`:

```ts
import { InterceptorNameInterceptor } from "./interceptors/interceptor-name.interceptor";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorNameInterceptor,
      multi: true,
    },
  ],
})
```

### Chain Multiple Observables Using pipe, take & exhaustMap

This is used to chain multiple observables. Example:

```ts
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { exhaustMap, take } from "rxjs/operators";

export class MyComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .pipe(
        take(1),
        exhaustMap((posts) => {
          return this.http.get("https://jsonplaceholder.typicode.com/users");
        })
      )
      .subscribe((users) => {
        console.log(users);
      });
  }
}
```

The `take(1)` is used to take only the first value from the observable. This helps to avoid multiple requests, or activating multiple subscriptions. The `exhaustMap` is used to map the first observable to the second observable. The `exhaustMap` will ignore any other values from the first observable until the second observable completes.

### BehaviourSubject

This is similar to a `Subject` but it has a default value. It is created using:

```ts
import { BehaviorSubject } from "rxjs";

myBehaviourSubject = new BehaviorSubject("Default value");
```

It can be used to share data between components. Example:

```ts
import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export class MyComponent {
  myBehaviourSubject = new BehaviorSubject("Default value");

  ngOnInit(): void {
    this.myBehaviourSubject.subscribe((data) => {
      console.log(data);
    });
  }

  onClick() {
    this.myBehaviourSubject.next("New value");
  }
}
```

### Dynamic Components

These are components that are created dynamically via code. They are created using:

```ts
import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

export class MyComponent {
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // create the component
    const alertComponentRef = this.alertHost.viewContainerRef.createComponent(alertComponentFactory);

    // set the component properties
    alertComponentRef.instance.message = "Some message";
  }
}
```

Then in the `html`:

```html
<ng-template placeholder></ng-template>
```

The `PlaceholderDirective` is used to mark the location where the component is to be created. It is created using:

```ts
import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[placeholder]",
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
```

### Creating Router as a Module

This is used to create a module that handles routing. It is created using:

```sh
ng g m app-routing --flat --module=app
```

The `--flat` is used to create the module in the `src/app` folder. The `--module=app` is used to register the module in the `app.module.ts`.

Then in the `app-routing.module.ts`:

```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { PricingComponent } from "./pricing/pricing.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "pricing", component: PricingComponent },
  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Then in the `app.module.ts`:

```ts
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  imports: [
    // ...
    AppRoutingModule,
  ],
})
export class AppModule {}
```

Then in the `app.component.html`:

```html
<app-header></app-header>
<router-outlet></router-outlet>
```

### Using a Core Module

This is just another module that can be used to hold services and other things that are used throughout the app.

### Lazy Loading

This is used to load modules only when needed. It is done by adding the `loadChildren` prop to the route:

```ts
const appRoutes: Routes = [
  { path: "users", loadChildren: () => import("./users/users.module").then((m) => m.UsersModule) },
];
```

The `loadChildren` prop takes a function that returns a promise. The promise is resolved when the module is loaded. The `import` statement is used to import the module. The `m` is the module that is loaded.

You can also `pre-load` the module by adding the `preloadingStrategy` prop to the `RouterModule.forRoot()`. This helps to load the module in the background while the user is still interacting with the app:

```ts
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

@NgModule({
  imports: [
    // ...
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppModule {}
```

### Signals, Effects & Computeds

Signals are used to better manage changes in the app and improve performance by telling angular when to update the view and not let it observe every change. Exaplme:

```ts
import {signal} from '@angular/core';

// later in the code
this.mySignal = new signal('initial value');
```

Then in the `html`:

```html
<!-- signal must be invoked to get its value -->
<p>{{ mySignal() }}</p>
```

To update the signal, several options exist:

```ts
// 1. set the value
this.mySignal.set('new value');

// 2. update the value
this.mySignal.update((value) => {
  return 'new value';
})

// 3. mutate incase of an array or object
this.mySignal.mutate((value) => {
  value.push('new value');
  // or
  value = [...value, 'new value'];
})
```

Computeds are also signals but are updated from other signals. Example:

```ts
import {signal, computed} from '@angular/core';

mySignal = signal(1);
myComputed = computed(() =>  this.mySignal() + 1)
```

Effects run some code when a signal changes. Example:

```ts
import {effect} from '@angular/core';

constructor() {
  effect(() => console.log(this.mySignal()))
}
```

### Angular Animations

### Angular Universal

### NgRx

<!-- TODO: Route Guards, rxjs (pipes, map, filter...), Observables -->
<!-- Signals and computeds -->
