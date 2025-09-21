import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import routeConfig from "./app/app.routes"

bootstrapApplication(appConfig, App,
{
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig)
  ]
})
  .catch((err) => console.error(err));
