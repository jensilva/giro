import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkSession().pipe(
    // @ts-ignore
    map(({session}) => {
      if (!session) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
