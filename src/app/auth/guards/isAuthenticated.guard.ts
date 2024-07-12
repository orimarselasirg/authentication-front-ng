import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';
import { AuthStatus } from '../interfaces/auth-status.interface';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthServicesService)
  const router = inject(Router)

  authService.authStatus

  console.log({authStatus: authService.authStatus()});

  if(authService.authStatus() === AuthStatus.authenticated) return true
  if(authService.authStatus() === AuthStatus.checking) return false

  // router.navigateByUrl('/auth/login')
  //this is a recomendation to track the last route visited
  // const url = state.url
  // localStorage.setItem('url', url)


  return false;
};
