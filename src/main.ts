import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MY_ROUTES } from './app/constants';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

if (environment.production) {
  enableProdMode();
}

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(
//       RouterModule.forRoot(MY_ROUTES, {
//         preloadingStrategy: PreloadAllModules,
//       }),
//       IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }),
//     ),
//     BrowserModule,
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//   ],
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ innerHTMLTemplatesEnabled: true }),
    provideRouter(MY_ROUTES),
  ],
});
