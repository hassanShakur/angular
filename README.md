# Angular

## Basics

### Initialize a component using:

```sh
ng g c componentName
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
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
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
