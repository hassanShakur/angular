import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// using standalone root module
// bootstrapApplication(AppModule, {
//   providers: [
//     Providers if any

// for importing routes
// importProvidersFrom(
//   import('./app/app-routing.module').then((m) => m.AppRoutingModule)
// ),
//   ],
// });
