import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.user$.value) {
    router.navigate(['./auth']);
    return false;
  } else {
    return true;
  }
};
