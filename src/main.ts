import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MY_ROUTES } from './app/constants';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(MY_ROUTES, {
        preloadingStrategy: PreloadAllModules,
      }),
      IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }),
    ),
    BrowserModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
}).catch((err) => console.error(err));
