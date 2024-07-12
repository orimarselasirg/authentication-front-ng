import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';
import { AuthStatus } from '../interfaces/auth-status.interface';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServicesService)
  const router = inject(Router)

  if(authService.authStatus() === AuthStatus.notAuthenticated) return true



  return false;
};
