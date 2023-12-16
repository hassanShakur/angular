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

1. ngOnChanges

   This is called when a bound input property (`@Input()`) changes. It is called before ngOnInit and whenever one or more data-bound input properties change.
   
   ```ts
    ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
    }
    ```

2. ngOnInit