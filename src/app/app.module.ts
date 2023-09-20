import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import SampleDirective from './server/myDirective.directive';
import { OnlyWhenDirective } from './only-when.directive';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    SampleDirective,
    OnlyWhenDirective
  ],
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
