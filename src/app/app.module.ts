import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OnlyWhenDirective } from './only-when.directive';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PricingComponent } from './pricing/pricing.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './home/user/user.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/:userName', component: UserComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OnlyWhenDirective,
    HomeComponent,
    AboutComponent,
    PricingComponent,
    HeaderComponent,
    UserComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
