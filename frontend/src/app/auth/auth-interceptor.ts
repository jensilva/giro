import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401 && !req.url.includes('/refresh-token') && !req.url.includes('/sign-in')) {
          return authService.renewSession().pipe(
            switchMap(() => {
              return next(req.clone());
            }),
            catchError(() => throwError(() => error))
          );
      }
      return throwError(() => error);
    })
  );
};
