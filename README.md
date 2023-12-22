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

#### Lazy Loading
