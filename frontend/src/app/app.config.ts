import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideZxvbnServiceForPSM, ZxvbnConfigType} from '@wise-community/angular-password-strength-meter/zxcvbn';
import {translations} from '@zxcvbn-ts/language-pt-br';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import {registerLocaleData} from '@angular/common';
import {authInterceptor} from './auth/auth-interceptor';
import {crendentialsInterceptor} from './crendentials-interceptor';

const zxvbnConfig: ZxvbnConfigType = {
  translations: translations,
};

registerLocaleData(localePt);


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideZxvbnServiceForPSM(zxvbnConfig),
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    provideHttpClient(
      withInterceptors([
        crendentialsInterceptor,
        authInterceptor
      ])
    )
  ]
};
